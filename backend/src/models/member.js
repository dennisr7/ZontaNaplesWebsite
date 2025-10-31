import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        trim: true
    },
    reason: {
        type: String,
        required: [true, 'Reason for joining is required'],
        minlength: [20, 'Reason must be at least 20 characters'],
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, { timestamps: true });

//index1 
memberSchema.index({ email: 1 }); //ascending order
memberSchema.index({ status: 1 }); //ascending order
memberSchema.index({ submittedAt: -1 }); //descending order

memberSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

memberSchema.set('toJSON', {virtuals: true });
memberSchema.set('toObject', {virtuals: true });

const Member = mongoose.model('Member', memberSchema);

export default Member;