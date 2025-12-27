import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPostPage = () => {
    const [communities, setCommunities] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch communities for the dropdown
        const fetchCommunities = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('https://betterknowit.onrender.com/api/communities', config);
                setCommunities(response.data);
            } catch (error) {
                console.error('Error fetching communities:', error);
                toast.error('Failed to load communities');
            }
        };
        fetchCommunities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userStr = sessionStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!user) {
            toast.error('You must be logged in to post');
            setLoading(false);
            navigate('/login');
            return;
        }

        if (!selectedCommunity) {
            toast.error('Please select a community');
            setLoading(false);
            return;
        }

        try {
            const newQuestion = {
                question_id: Math.floor(Math.random() * 1000000), // Simple ID generation
                community_id: selectedCommunity,
                user_id: user._id,
                question: question,
                res_count: 0,
                share_count: 0
            };

            const token = sessionStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.post('https://betterknowit.onrender.com/api/questions', newQuestion, config);
            toast.success('Question posted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error posting question:', error);
            toast.error('Failed to post question');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#030303] min-h-screen pt-4 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-[#343536]">
                    Create a Question
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Community Selector */}
                    <div className="space-y-2">
                        <label className="text-gray-300 font-medium text-sm">Choose a community</label>
                        <select
                            value={selectedCommunity}
                            onChange={(e) => setSelectedCommunity(e.target.value)}
                            className="w-full bg-[#1a1a1b] border border-[#343536] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                        >
                            <option value="">Select a community</option>
                            {communities.map((community) => (
                                <option key={community._id} value={community._id}>
                                    r/{community.community_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Question Input */}
                    <div className="space-y-2">
                        <label className="text-gray-300 font-medium text-sm">Target Question</label>
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="What's on your mind?"
                            rows="6"
                            className="w-full bg-[#1a1a1b] border border-[#343536] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none placeholder-gray-500"
                            required
                        ></textarea>
                        <p className="text-xs text-gray-500 text-right">{question.length}/300</p>
                    </div>

                    {/* Action Buttons */}
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
                            {loading ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddPostPage;
