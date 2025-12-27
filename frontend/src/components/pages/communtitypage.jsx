import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CommunityPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userStr = sessionStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!user) {
            toast.error('You must be logged in to create a community');
            setLoading(false);
            navigate('/login');
            return;
        }

        try {
            const newCommunity = {
                community_id: Math.floor(Math.random() * 1000000),
                community_name: name,
                description: description,
                created_user_id: user._id,
                users_count: 1,
                questions_count: 0
            };

            const token = sessionStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.post('https://betterknowit.onrender.com/api/communities', newCommunity, config);
            toast.success('Community created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating community:', error);
            toast.error('Failed to create community');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#030303] min-h-screen pt-4 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-2">Create a Community</h1>
                <p className="text-gray-400 mb-8 border-b border-[#343536] pb-4">
                    Build a new home for your interests
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-white font-medium text-lg">Name</label>
                        <p className="text-xs text-gray-400">
                            Community names including capitalization cannot be changed.
                        </p>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-gray-400">r/</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#1a1a1b] border border-[#343536] text-white rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                                maxLength={21}
                                required
                            />
                        </div>
                        <p className="text-xs text-gray-500">{21 - name.length} characters remaining</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-white font-medium text-lg">Description</label>
                        <p className="text-xs text-gray-400">
                            This is how new members come to understand your community.
                        </p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#1a1a1b] border border-[#343536] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-2 rounded-full border border-[#343536] text-gray-300 font-semibold hover:bg-[#1A1A1A] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 rounded-full bg-orange-600 text-white font-semibold transition-all hover:bg-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating...' : 'Create Community'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CommunityPage;
