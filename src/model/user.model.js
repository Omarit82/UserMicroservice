import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });

export const userModel = mongoose.model("users", userSchema);