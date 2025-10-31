import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'zonta-scholarships',
        allowed_formats: ['pdf', 'doc', 'docx'],
        resource_type: 'raw', //allows for non image files
        public_id: (req, file) => {
            const timestamp = Date.now();
            const originalName = file.originalname.replace(/\.[^/.]+$/, ''); //removes file extension
            return `${originalName}-${timestamp}`;
        }
    }
})

// filter restricts the types of files that can be uploaded. So only pdf, doc, docx
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    //what mimetype does is that it checks the file header to determine the file type
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true); //file is accepted
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false); //file is rejected
    }
}

const upload = multer(({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // allows for 5 MB limit
        files: 2 //allows for only 2 files per upload
    }
}))


export const uploadScholarshipDocs = upload.array('documents', 2); //name will be documents, and max 2 files

export const handleMulterErr = (err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        if(err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false,
                error: 'File size is too large. Max size is 5MB.'
             });
        }

        if(err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                error: 'File limit reached. Max 2 files allowed.'
            });
        }

        if(err.code === 'LIMIT_UNEXPCTED_FILE') {
            return res.status(400).json({
                success: false,
                error: 'Unexpected field name. Please use "documents" as the field name.'
            });
        }

        return res.status(400).json({
            success: false,
            error: `File upload error: ${err.message}`
        });
    }

    //for more generic errors
    if(err) {
        return res.status(400).json({
            sucess: false,
            error: err.message
        });
    }

    next();
}
