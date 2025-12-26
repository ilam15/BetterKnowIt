const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question_id: {
        type: Number,
        required: true
    },
    community_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Communities"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    question: {
        type: String,
        required: true
    },
    res_count: {
        type: Number,
        default: 0
    },
    share_count: {
        type: Number,
        default: 0
    },
    votes: {
        type: Number,
        default: 0
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers"
    }]
}, { timestamps: true });

module.exports = mongoose.model("Questions", QuestionSchema);
