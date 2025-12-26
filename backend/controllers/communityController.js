const Community = require('../models/Communities');

const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find().populate('created_user_id', 'username');
        res.status(200).json(communities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommunitybyId = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id).populate('created_user_id', 'username');
        if (!community) return res.status(404).json({ message: 'Community not found' });
        res.status(200).json(community);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postCommunity = async (req, res) => {
    try {
        const community = await Community.create(req.body);
        res.status(200).json(community);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCommunity = async (req, res) => {
    try {
        const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!community) return res.status(404).json({ message: 'Community not found' });
        res.status(200).json(community);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCommunity = async (req, res) => {
    try {
        const community = await Community.findByIdAndDelete(req.params.id);
        if (!community) return res.status(404).json({ message: 'Community not found' });
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getCommunities, getCommunitybyId, postCommunity, updateCommunity, deleteCommunity };
