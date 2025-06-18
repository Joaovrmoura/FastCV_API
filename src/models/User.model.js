const mongoose = require('mongoose')

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
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)
module.exports = User

