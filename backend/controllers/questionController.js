const Question = require('../models/Questions');

const getQuestions = async (req, res) => {
    try {
        const { community_id, user_id } = req.query;
        let query = {};
        if (community_id) {
            query.community_id = community_id;
        }
        if (user_id) {
            query.user_id = user_id;
        }

        const questions = await Question.find(query)
            .populate('user_id', 'username')
            .populate('community_id', 'community_name')
            .populate({
                path: 'answers',
                populate: { path: 'user_id', select: 'username' }
            })
            .sort({ createdAt: -1 }); // Newest first
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionbyId = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('user_id', 'username')
            .populate('community_id', 'community_name')
            .populate({
                path: 'answers',
                populate: { path: 'user_id', select: 'username' }
            });
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const voteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // 'up' or 'down'

        const question = await Question.findById(id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (type === 'up') {
            question.votes += 1;
        } else if (type === 'down') {
            question.votes -= 1;
        }

        await question.save();
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getQuestions, getQuestionbyId, postQuestion, updateQuestion, deleteQuestion, voteQuestion };
