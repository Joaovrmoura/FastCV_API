import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: [true, 'Usuário já cadastrado'],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema);
export default User;

