// server/test-email.js
import nodemailer, { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


export const sendMemberShipApplicationEmail = async (applicationData) => {
    const { firstName, lastName, email, phone, response } = applicationData;

    //const transporter = createTransport();

    //this gets emailed to an admin
    const adminMailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Membership Application - ${firstName} ${lastName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                    New Membership Application
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                </div>

                <div style="margin: 20px 0;">
                    <h3 style="color: #2c3e50;">Reason for Joining:</h3>
                    <p style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; border-radius: 3px;">
                        ${response}
                    </p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 12px;">
                    <p>Submitted: ${new Date().toLocaleString()}</p>
                    <p>This is an automated message from the Zonta Club of Naples website.</p>
                </div>
            </div>
        `

    }

    const applicantMailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Your Membership Application was Received - Zonta Club of Naples',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50;">Thank You for Your Interest!</h2>
                
                <p>Dear ${firstName},</p>
                
                <p>Thank you for your interest in joining the Zonta Club of Naples. We have received your membership application and will review it shortly.</p>
                
                <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>What happens next?</strong></p>
                    <ul style="margin: 10px 0;">
                        <li>Our Membership Chair will review your application</li>
                        <li>We will contact you within 3-5 business days</li>
                        <li>You may be invited to attend a meeting or event</li>
                    </ul>
                </div>

                <p>If you have any questions, please don't hesitate to reach out to us.</p>
                
                <p style="margin-top: 30px;">
                    Best regards,<br>
                    <strong>The Zonta Club of Naples</strong>
                </p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 12px;">
                    <p>This is an automated confirmation email. Please do not reply to this message.</p>
                </div>
            </div>
        `
    }

    try {
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(applicantMailOptions);
        console.log('Membership application emails sent successfully!');
    } catch (error) {
        console.error('Error sending membership application emails:', error);
        throw new Error('Failed to send membership application emails');
    }
}

export const testEmailConnection = async () => {
    const transporter = createTransport();

    try {
        await transporter.verify();
        console.log('email server server ready');
        return true;
    } catch(error) {
        console.error('email server not ready:', error);
        return false;
    }
}