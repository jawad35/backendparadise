const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    // },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        Default: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    },
    passwordResetToken: String,
    passwordResetExpires: Date
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("User", userSchema)