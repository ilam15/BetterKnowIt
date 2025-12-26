const Answer = require('../models/Answers');
const Question = require('../models/Questions');

const getAnswers = async (req, res) => {
    try {
        const answers = await Answer.find()
            .populate('user_id', 'username')
            .populate('question_id', 'question');
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnswerbyId = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id)
            .populate('user_id', 'username')
            .populate('question_id', 'question');
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postAnswer = async (req, res) => {
    try {
        const answer = await Answer.create(req.body);

        // Update Question with new answer
        await Question.findByIdAndUpdate(
            req.body.question_id,
            { $push: { answers: answer._id }, $inc: { res_count: 1 } },
            { new: true }
        );

        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndDelete(req.params.id);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAnswers, getAnswerbyId, postAnswer, updateAnswer, deleteAnswer };
