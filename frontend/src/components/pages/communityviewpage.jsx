import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Questioncard from '../cards/questioncard';

const CommunityViewPage = () => {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                // Fetch community details
                const comRes = await axios.get(`https://betterknowit.onrender.com/api/communities/${id}`, config);
                setCommunity(comRes.data);

                // Fetch questions for this community
                const qRes = await axios.get(`https://betterknowit.onrender.com/api/questions?community_id=${id}`, config);
                setQuestions(qRes.data);
            } catch (error) {
                console.error("Error fetching community data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (!community) return <div className="text-white text-center mt-20">Community not found</div>;

    return (
        <main className="bg-[#030303] min-h-screen">
            {/* Banner */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-orange-400 to-red-500 rounded-b-md relative mb-14">
                <div className="absolute -bottom-12 left-4 md:left-8 flex items-end gap-4 w-[calc(100%-2rem)]">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1a1a1b] p-1 border-4 border-[#030303] shrink-0">
                        <div className="w-full h-full rounded-full bg-orange-600 flex items-center justify-center text-3xl md:text-4xl font-bold text-white uppercase">
                            {community.community_name.charAt(0)}
                        </div>
                    </div>
                    <div className="mb-1 flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md truncate leading-tight">r/{community.community_name}</h1>
                        <p className="text-gray-400 text-sm font-medium truncate">r/{community.community_name}</p>
                    </div>
                    <button className="mb-2 px-6 py-1.5 md:py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors text-sm shrink-0">
                        Join
                    </button>
                </div>
            </div>

            <div className="px-4">
                <div className="flex gap-1 mb-6">
                    <button className="px-6 py-2 text-white bg-[#272729] rounded-full font-bold text-sm">Posts</button>
                    <button className="px-6 py-2 text-gray-400 hover:bg-[#1a1a1b] rounded-full font-bold text-sm hover:text-white transition-colors">About</button>
                </div>

                <div className="space-y-4">
                    {questions.length > 0 ? (
                        questions.map(q => <Questioncard key={q._id} question={q} />)
                    ) : (
                        <div className="text-center py-20 bg-[#1a1a1b] rounded-xl border border-[#343536]">
                            <h3 className="text-xl font-bold text-white mb-2">No posts here yet</h3>
                            <p className="text-gray-400">Be the first to post in r/{community.community_name}!</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CommunityViewPage;
