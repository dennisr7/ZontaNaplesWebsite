import { sendMemberShipApplicationEmail } from "../utils/emailService.js";

export const submitMembershipApplication = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, response } = req.body;

        if(!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                error: 'Missing a required field'
            });
        } 
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // this means that there is at least one character before and after the @ and . symbols
        if(!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        if(!response || response.trim().length < 20) {
            return res.status(400).json({
                success: false,
                error: 'Response must be at least 20 characters long'
            });
        }

        const applicationData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : null,
            response: response.trim()
        };

        await sendMemberShipApplicationEmail(applicationData);

        res.status(200).json({
            success: true,
            message: 'Thank you for your application! We will review it and get back to you soon.',
            data: {
                applicantName: `${applicationData.firstName} ${applicationData.lastName}`,
                applicantEmail: applicationData.email,
                submittedAt: new Date().toISOString()
            }
        })

        console.log('Membership application processed for:', applicationData.email);
    } catch (error) {
        console.error('Error processing membership application:', error);
        
        //next allows us to pass the error to the error handling middleware
        next(error);
    }
}

//test endpoint
export const testMemberEndpoint = (req, res) => {
    res.json({
        success: true,
        message: 'Member API is working',
        timestamp: new Date().toISOString()
    });
}




