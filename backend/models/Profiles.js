const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    profile_picture: {
        type: String,
        default: ""
    },
    cover_picture: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Communities"
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers"
    }]
}, { timestamps: true });

module.exports = mongoose.model("Profiles", ProfileSchema);
