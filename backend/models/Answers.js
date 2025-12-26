const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    answer_id: {
        type: Number,
        required: true
    },
    answer_description: {
        type: String,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    like_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Answers", AnswerSchema);
