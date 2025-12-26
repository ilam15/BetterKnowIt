import { useState } from 'react';
import { MoreHorizontal, ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Award, Trash2, Edit2, X, Check } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AnswerCard = ({ answer }) => {
    const userStr = sessionStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(answer.answer_description || answer);
    const [voteCount, setVoteCount] = useState(Math.floor(Math.random() * 50) + 2); // Mock vote count
    const [isDeleted, setIsDeleted] = useState(false);

    // Determines if the current user is the author of this answer
    const isOwner = user && (user._id === answer.user_id?._id || user._id === answer.user_id);

    const formatDate = () => {
        // Mock date logic since answer creation date might not be in schema yet, 
        // fallbacks to random recent times to look alive
        return "3h ago";
    };

    const handleVote = (type) => {
        if (!user) return toast.error("Login to vote");
        // Mock UI update
        type === 'up' ? setVoteCount(prev => prev + 1) : setVoteCount(prev => prev - 1);
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            const token = sessionStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`http://localhost:5000/api/answers/${answer._id || answer.answer_id}`, config);
            setIsDeleted(true);
            toast.success("Comment deleted");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete");
        }
    };

    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:5000/api/answers/${answer._id || answer.answer_id}`, {
                answer_description: editValue
            }, config);
            setIsEditing(false);
            toast.success("Comment updated");
            // Ideally parent should reload or we update local prop display, 
            // but since we mutated local state 'editValue' and will render that, it's fine for now
            window.location.reload();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update");
        }
    };

    if (isDeleted) return null;

    return (
        <div className="mb-0 p-3 pl-0 hover:bg-[#1a1a1b]/50 transition-colors rounded-r-md group">
            <div className="flex gap-3">
                {/* User Avatar Column */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                        {answer.user_id?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {/* Visual Thread line connecting comments (optional specific UI feature) */}
                    <div className="w-0.5 h-full bg-[#343536] group-hover:bg-[#4a4a4b] transition-colors rounded-full my-1"></div>
                </div>

                <div className="flex-1">
                    {/* Metadata Header */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <span className="font-bold text-gray-200 hover:underline cursor-pointer">
                            u/{answer.user_id?.username || 'user'}
                        </span>
                        <span>•</span>
                        <span>{formatDate()}</span>
                        {/* Optional Badges */}
                        {isOwner && (
                            <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded text-[10px] border border-green-500/20 font-bold">YOU</span>
                        )}
                        {Math.random() > 0.8 && (
                            <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] border border-blue-500/20">Top Contributor</span>
                        )}
                    </div>

                    {/* Answer Content / Edit Mode */}
                    {isEditing ? (
                        <div className="my-2">
                            <textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full bg-[#030303] border border-[#343536] rounded p-2 text-white text-sm focus:outline-none focus:border-orange-500"
                                rows="3"
                            />
                            <div className="flex gap-2 mt-2">
                                <button onClick={handleUpdate} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-500">
                                    <Check size={14} /> Save
                                </button>
                                <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1 bg-[#272729] text-gray-300 text-xs rounded hover:bg-[#343536]">
                                    <X size={14} /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-200 text-sm leading-relaxed mb-2 whitespace-pre-wrap">
                            {editValue}
                        </div>
                    )}

                    {/* Action Footer */}
                    <div className="flex items-center gap-4">
                        {/* Voting */}
                        <div className="flex items-center gap-1.5 bg-[#272729] rounded-full px-1.5 py-0.5 shadow-sm border border-[#343536]">
                            <button onClick={() => handleVote('up')} className="p-1 rounded hover:bg-[#343536] text-gray-400 hover:text-orange-500 transition-colors">
                                <ArrowBigUp size={18} />
                            </button>
                            <span className="text-xs font-bold text-gray-300 min-w-[16px] text-center">{voteCount}</span>
                            <button onClick={() => handleVote('down')} className="p-1 rounded hover:bg-[#343536] text-gray-400 hover:text-blue-500 transition-colors">
                                <ArrowBigDown size={18} />
                            </button>
                        </div>

                        <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:bg-[#272729] px-2 py-1 rounded transition-colors">
                            <MessageSquare size={16} />
                            <span className="">Reply</span>
                        </button>

                        <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:bg-[#272729] px-2 py-1 rounded transition-colors">
                            <Share2 size={16} />
                            <span className="">Share</span>
                        </button>

                        {/* Edit/Delete Actions for Owner */}
                        {isOwner && (
                            <div className="flex items-center gap-2 ml-auto">
                                <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:bg-[#272729] hover:text-blue-400 px-2 py-1 rounded transition-colors" title="Edit">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={handleDelete} className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:bg-[#272729] hover:text-red-400 px-2 py-1 rounded transition-colors" title="Delete">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}

                        {!isOwner && (
                            <button className="text-gray-400 hover:bg-[#272729] p-1 rounded transition-colors ml-auto">
                                <MoreHorizontal size={16} />
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerCard;
