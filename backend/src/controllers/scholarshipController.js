import { sendScholarshipApplicationEmail } from '../utils/emailService.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const submitScholarshipApplication = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone} = req.body;

        const files = req.files || [];

        const errors = [];

        if(!firstName || firstName.trim().length < 2) {
            errors.push('First name must be at least 2 characters long.');
        }

        if(!lastName || lastName.trim().length < 2) {
            errors.push('Last name must be at least 2 characters long.');
        };

        if(!email || email.trim().length === 0) {
            errors.push('Email is required.');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                errors.push('Invalid email format.');
            }
        }

        if(files.length === 0) {
            errors.push('At least one document must be uploaded.');
        }

        if(errors.length > 0) {
            //delete uploaded files if validation fails
            files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if(err) {
                        console.error('Error deleting file:', file.path, err);
                    }
                });
            });

            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                errors: errors
            });
        }

        const applicationData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : null,
        };


        await sendScholarshipApplicationEmail(applicationData, files);

        res.status(201).json({
            success: true,
            message: 'Scholarship application submitted successfully.',
            data: {
                applicantName: `${applicationData.firstName} ${applicationData.lastName}`,
                applicantEmail: applicationData.email,
                submittedAt: new Date().toISOString()
            }
        });

        console.log(`Scholarship application submitted: ${applicationData.email}`);
    } catch (error) {
        console.error('Error submitting scholarship application:', error);

        next(error);
    }
};


export const downloadScholarshipForm = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../forms/test-form.pdf');

        if(!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false, 
                error: 'Form not found'
            });
        }

        res.download(filePath, 'zontaScholarship-Form.pdf', (err) => {
            if(err) {
                console.error('Error downloading form:', err);
                res.status(500).json({
                    success: false,
                    error: 'Error downloading form'
                });
            }
        });

        console.log('Scholarship form downloaded');
    } catch (error) {
        console.error('Error downloading scholarship form:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while downloading form'
        });
    }
}

export const testScholarshipEndpoint = (req, res) => {
    res.json({
        success: true,
        message: 'Scholarship API is working!',
        instructions: {
            step1: 'Download the scholarship application form',
            step2: 'Fill out the form completely',
            step3: 'Upload completed form along with transcripts and recommendation letters',
            step4: 'Provide your contact information'
        },
        uploadInfo: {
            maxFileSize: '5MB per file',
            maxFiles: 2,
            allowedTypes: ['PDF', 'DOC', 'DOCX'],
            requiredFields: ['firstName', 'lastName', 'email']
        },
        timestamp: new Date().toISOString()
    });
};