import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Questioncard from '../cards/questioncard';

const SingleQuestionPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestion = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get(`http://localhost:5000/api/questions/${id}`, config);
                setQuestion(response.data);
            } catch (error) {
                console.error("Error fetching question:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchQuestion();
    }, [id]);

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (!question) return <div className="text-white text-center mt-20">Question not found</div>;

    return (
        <main className="bg-[#030303] min-h-screen pt-4 px-4 pb-20">
            {/* Back Button */}
            <div className="mb-4">
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to feed
                </Link>
            </div>

            <Questioncard question={question} defaultExpanded={true} />
        </main>
    );
};

export default SingleQuestionPage;
