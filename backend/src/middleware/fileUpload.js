import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

//get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //callback to store files in uploads folder
        cb(null, path.join(__dirname, '../uploads/scholarships'));
    },
    filename: (req, file, cb) => {
        //this creates unique filenames for each upload
        //bad suffix, need to fix but looks like: <originalname>-<timestamp>-<randomnumber>
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // this suffix helps avoid overwriting files
        const ext = path.extname(file.originalname); // we need the file ext because original name may have multiple dots
        const nameWithoutExt = path.basename(file.originalname, ext); // useful for creating a new file name
        cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`); // e.g., document-1632345678901-123456789.pdf
    }
});


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
