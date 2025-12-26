const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
    community_id: {
        type: Number,
        required: true
    },
    community_name: {
        type: String,
        required: true
    },
    created_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    }],
    users_count: {
        type: Number,
        default: 0
    },
    questions_count: {
        type: Number,
        default: 0
    },
    com_res_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Communities", CommunitySchema);
