const Profile = require('../models/Profiles');

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user_id', 'username');
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfilebyId = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user_id', 'username');
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postProfile = async (req, res) => {
    try {
        const profile = await Profile.create(req.body);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProfiles, getProfilebyId, postProfile, updateProfile, deleteProfile };
