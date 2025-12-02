import cron from 'node-cron';
import { checkMembershipRenewals } from '../controllers/membershipPaymentController.js';
import Event from '../models/event.js';
import { sendEventReminder } from './emailService.js';

/**
 * Check for events happening in the next 24 hours and send reminders
 */
export const checkAndSendEventReminders = async () => {
    try {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Find active events happening in the next 24 hours
        const upcomingEvents = await Event.find({
            status: 'active',
            date: {
                $gte: now,
                $lte: tomorrow
            }
        });

        console.log(`Found ${upcomingEvents.length} events in the next 24 hours`);

        for (const event of upcomingEvents) {
            if (!event.rsvps || event.rsvps.length === 0) {
                console.log(`Event "${event.title}" has no RSVPs, skipping reminder`);
                continue;
            }

            // Filter RSVPs that haven't received a reminder yet
            const rsvpsNeedingReminder = event.rsvps.filter(
                rsvp => rsvp.status === 'confirmed' && !rsvp.reminderSent
            );

            if (rsvpsNeedingReminder.length === 0) {
                console.log(`All RSVPs for event "${event.title}" have already received reminders`);
                continue;
            }

            console.log(`Sending reminders to ${rsvpsNeedingReminder.length} attendees for event: ${event.title}`);

            // Send reminder to each attendee
            for (const rsvp of rsvpsNeedingReminder) {
                try {
                    await sendEventReminder(event, rsvp.email);
                    
                    // Mark reminder as sent
                    rsvp.reminderSent = true;
                    rsvp.reminderSentAt = new Date();
                    
                    console.log(`Reminder sent to ${rsvp.email} for event: ${event.title}`);
                } catch (error) {
                    console.error(`Error sending reminder to ${rsvp.email}:`, error);
                }
            }

            // Save the updated event with reminder flags
            await event.save();
        }

        return {
            success: true,
            eventsProcessed: upcomingEvents.length,
            remindersSent: upcomingEvents.reduce(
                (total, event) => total + (event.rsvps?.filter(r => r.reminderSent).length || 0),
                0
            )
        };

    } catch (error) {
        console.error('Error checking and sending event reminders:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Initialize all scheduled tasks
 */
export const initializeScheduler = () => {
    console.log('Initializing scheduled tasks...');

    // Schedule membership renewal reminders - runs daily at 9 AM
    cron.schedule('0 9 * * *', async () => {
        console.log('Running scheduled membership renewal check...');
        try {
            const result = await checkMembershipRenewals();
            console.log('Membership renewal check completed:', result);
        } catch (error) {
            console.error('Error in scheduled membership renewal check:', error);
        }
    }, {
        timezone: "America/New_York" // Adjust to your timezone
    });

    // Schedule event reminders - runs daily at 8 AM
    cron.schedule('0 8 * * *', async () => {
        console.log('Running scheduled event reminder check...');
        try {
            const result = await checkAndSendEventReminders();
            console.log('Event reminder check completed:', result);
        } catch (error) {
            console.error('Error in scheduled event reminder check:', error);
        }
    }, {
        timezone: "America/New_York" // Adjust to your timezone
    });

    console.log('Scheduled tasks initialized:');
    console.log('- Membership renewals: Daily at 9:00 AM EST');
    console.log('- Event reminders: Daily at 8:00 AM EST');
};

export default {
    initializeScheduler,
    checkAndSendEventReminders
};
