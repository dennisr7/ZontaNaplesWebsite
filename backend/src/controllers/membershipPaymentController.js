import Stripe from 'stripe';
import Member from '../models/member.js';
import { sendMembershipRenewalReminder } from '../utils/emailService.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Membership pricing (in cents)
const MEMBERSHIP_PRICES = {
    initial: 17000, // $170.00 for new members
    renewal: 14800  // $148.00 for renewals ($2 discount)
};

/**
 * Create a Stripe checkout session for membership payment
 */
export const createMembershipCheckout = async (req, res, next) => {
    try {
        const { memberId, isRenewal = false } = req.body;

        if (!memberId) {
            return res.status(400).json({
                success: false,
                message: 'Member ID is required'
            });
        }

        // Find the member
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        // Verify member is approved but not yet paid (for initial payment)
        if (!isRenewal && member.status !== 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Member must be approved before payment'
            });
        }

        // For renewals, verify member is active
        if (isRenewal && member.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Only active members can renew'
            });
        }

        // Determine price based on whether it's a renewal
        const amount = isRenewal ? MEMBERSHIP_PRICES.renewal : MEMBERSHIP_PRICES.initial;
        const description = isRenewal 
            ? `Membership Renewal - ${member.firstName} ${member.lastName}`
            : `Initial Membership Payment - ${member.firstName} ${member.lastName}`;

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Zonta Club of Naples Membership',
                            description: description,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/membership/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/membership/payment-cancelled`,
            customer_email: member.email,
            metadata: {
                memberId: member._id.toString(),
                isRenewal: isRenewal.toString(),
                memberName: `${member.firstName} ${member.lastName}`
            }
        });

        res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Error creating membership checkout session:', error);
        next(error);
    }
};

/**
 * Retrieve a checkout session by ID
 */
export const getCheckoutSession = async (req, res, next) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID is required'
            });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.json({
            success: true,
            data: {
                status: session.payment_status,
                customerEmail: session.customer_email,
                amountTotal: session.amount_total / 100
            }
        });

    } catch (error) {
        console.error('Error retrieving checkout session:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve payment session'
        });
    }
};

/**
 * Handle Stripe webhook for successful membership payments
 */
export const handleMembershipWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            const memberId = session.metadata.memberId;
            const isRenewal = session.metadata.isRenewal === 'true';

            if (!memberId) {
                console.error('No memberId in webhook metadata');
                return res.status(400).json({ error: 'Missing memberId in metadata' });
            }

            // Find the member
            const member = await Member.findById(memberId);
            if (!member) {
                console.error(`Member not found: ${memberId}`);
                return res.status(404).json({ error: 'Member not found' });
            }

            // Update member based on payment type
            if (isRenewal) {
                // For renewals, extend membership by 1 year from current renewal date
                const currentRenewalDate = member.membershipRenewalDate || new Date();
                const newRenewalDate = new Date(currentRenewalDate);
                newRenewalDate.setFullYear(newRenewalDate.getFullYear() + 1);

                member.membershipRenewalDate = newRenewalDate;
                member.lastPaymentDate = new Date();
                member.lastPaymentAmount = session.amount_total / 100; // Convert from cents
                
                // Add payment to history
                member.paymentHistory.push({
                    amount: session.amount_total / 100,
                    date: new Date(),
                    stripeSessionId: session.id,
                    type: 'renewal'
                });

                console.log(`Membership renewed for ${member.email} until ${newRenewalDate.toISOString()}`);
            } else {
                // For initial payment, activate membership
                member.status = 'active';
                member.joinDate = new Date();
                
                // Set renewal date to 1 year from now
                const renewalDate = new Date();
                renewalDate.setFullYear(renewalDate.getFullYear() + 1);
                member.membershipRenewalDate = renewalDate;
                
                member.lastPaymentDate = new Date();
                member.lastPaymentAmount = session.amount_total / 100;
                
                // Add payment to history
                member.paymentHistory.push({
                    amount: session.amount_total / 100,
                    date: new Date(),
                    stripeSessionId: session.id,
                    type: 'initial'
                });

                console.log(`Initial membership payment completed for ${member.email}`);
            }

            await member.save();

            res.status(200).json({ 
                received: true,
                message: `Membership ${isRenewal ? 'renewed' : 'activated'} successfully`
            });

        } catch (error) {
            console.error('Error processing webhook:', error);
            return res.status(500).json({ error: 'Internal server error processing payment' });
        }
    } else {
        // Unexpected event type
        console.log(`Unhandled event type: ${event.type}`);
        res.status(200).json({ received: true });
    }
};

/**
 * Check for upcoming membership renewals and send reminder emails
 * This is called by the scheduler
 */
export const checkMembershipRenewals = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find members whose membership expires in 30 days
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(today.getDate() + 30);

        const membersNeedingReminder = await Member.find({
            status: 'active',
            membershipRenewalDate: {
                $gte: today,
                $lte: thirtyDaysFromNow
            },
            renewalReminderSent: { $ne: true } // Haven't sent reminder yet
        });

        console.log(`Found ${membersNeedingReminder.length} members needing renewal reminders`);

        for (const member of membersNeedingReminder) {
            try {
                // Create a renewal payment URL
                const paymentUrl = `${process.env.FRONTEND_URL}/membership/renew/${member._id}`;

                // Send renewal reminder email
                await sendMembershipRenewalReminder(member, paymentUrl);

                // Mark reminder as sent
                member.renewalReminderSent = true;
                await member.save();

                console.log(`Renewal reminder sent to ${member.email}`);
            } catch (error) {
                console.error(`Error sending renewal reminder to ${member.email}:`, error);
            }
        }

        return {
            success: true,
            remindersSent: membersNeedingReminder.length
        };

    } catch (error) {
        console.error('Error checking membership renewals:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Manual trigger for membership renewal reminders (admin only)
 */
export const triggerRenewalReminders = async (req, res, next) => {
    try {
        const result = await checkMembershipRenewals();
        
        res.status(200).json({
            success: result.success,
            message: `Renewal reminders processed`,
            remindersSent: result.remindersSent || 0,
            error: result.error || null
        });
    } catch (error) {
        console.error('Error triggering renewal reminders:', error);
        next(error);
    }
};
