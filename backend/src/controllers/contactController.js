import Contact from '../models/contact.js';
import { sendContactConfirmationEmail, sendContactNotificationEmail } from '../utils/emailService.js';

// Submit a contact form
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Create contact data object (not saving to database)
        const contactData = {
            name,
            email,
            subject,
            message,
            submittedAt: new Date()
        };

        // Send confirmation email to user
        try {
            await sendContactConfirmationEmail(email, name);
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Don't fail the request if email fails
        }

        // Send notification email to admin
        try {
            await sendContactNotificationEmail(contactData);
        } catch (emailError) {
            console.error('Error sending admin notification email:', emailError);
            return res.status(500).json({
                success: false,
                error: 'Failed to send email notification'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form'
        });
    }
};

// Get all contact submissions (Admin only)
export const getAllContacts = async (req, res) => {
    try {
        const { status, limit = 50, page = 1 } = req.query;

        const query = {};
        if (status) {
            query.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const contacts = await Contact.find(query)
            .sort({ submittedAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });

    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contacts'
        });
    }
};

// Get single contact (Admin only)
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });

    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact'
        });
    }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status, notes },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });

    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update contact'
        });
    }
};

// Delete contact (Admin only)
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete contact'
        });
    }
};
