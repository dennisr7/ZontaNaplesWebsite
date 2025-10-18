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

export const sendScholarshipApplicationEmail = async (applicationData, files = []) => {
    const { firstName, lastName, email, phone } = applicationData;



    //sample of how this would look like: attachments: [{ filename: 'transcript.pdf', path: '/path/to/transcript.pdf' }]
    const attachments = files.map((file) => ({
        filename: file.originalname,
        path: file.path,
    }))

    const adminMailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Scholarship Application - ${firstName} ${lastName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                    New Scholarship Application
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2c3e50;">Applicant Contact Information</h3>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                </div>

                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2c3e50;">Submitted Documents (${files.length})</h3>
                    <p>The applicant has submitted the following documents:</p>
                    <ul>
                        ${files.map(file => `<li><strong>${file.originalname}</strong> (${(file.size / 1024).toFixed(2)} KB)</li>`).join('')}
                    </ul>
                    <p style="margin-top: 15px; font-size: 14px; color: #555;">
                        <em>📎 All documents are attached to this email for your review.</em>
                    </p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 12px;">
                    <p>Submitted: ${new Date().toLocaleString()}</p>
                    <p>This is an automated message from the Zonta Club of Naples website.</p>
                </div>
            </div>
        `,
        attachments: attachments
    }

    const applicantMailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Scholarship Application Received - Zonta Club of Naples',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50;">Scholarship Application Received!</h2>
                
                <p>Dear ${firstName},</p>
                
                <p>Thank you for submitting your scholarship application to the Zonta Club of Naples. We have successfully received your completed application form and supporting documents.</p>
                
                <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Submission Confirmed:</strong></p>
                    <ul style="margin: 10px 0;">
                        <li><strong>Applicant:</strong> ${firstName} ${lastName}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Documents Submitted:</strong> ${files.length}</li>
                        <li><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</li>
                    </ul>
                </div>

                <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>What happens next?</strong></p>
                    <ul style="margin: 10px 0;">
                        <li>Our scholarship committee will review your application</li>
                        <li>Review process takes approximately 2-4 weeks</li>
                        <li>We will contact you via email with next steps</li>
                        <li>Finalists will be invited for an interview</li>
                    </ul>
                </div>

                <p>If you have any questions or need to submit additional documents, please don't hesitate to contact us.</p>
                
                <p style="margin-top: 30px;">
                    Best of luck!<br>
                    <strong>The Zonta Club of Naples Scholarship Committee</strong>
                </p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 12px;">
                    <p>This is an automated confirmation email. Please do not reply to this message.</p>
                </div>
            </div>
        `
    };

    try {
        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(applicantMailOptions);
        console.log('Scholarship application sent successfully');
    } catch (error) {
        console.error('Error sending scholarship:', error);
        throw new Error('Failed to send email');
    }
};


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