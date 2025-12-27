import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AnswerCard from './answercard';

const Questioncard = ({ question, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(question.question);

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`https://betterknowit.onrender.com/api/questions/${question._id}`, {
        question: editValue
      }, config);
      setIsEditing(false);
      toast.success("Post updated");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post");
    }
  };

  const userStr = sessionStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const formatDate = (dateObj) => {
    if (!dateObj) return 'Unknown date';

    const date = dateObj.$date ? new Date(dateObj.$date) : new Date(dateObj);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`https://betterknowit.onrender.com/api/questions/${question._id}`, config);
      toast.success("Question deleted");
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to answer");
      return;
    }
    if (!answerText.trim()) return;

    setSubmitting(true);
    try {
      const newAnswer = {
        answer_id: Math.floor(Math.random() * 1000000),
        answer_description: answerText,
        question_id: question._id,
        user_id: user._id
      };

      const token = sessionStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post("https://betterknowit.onrender.com/api/answers", newAnswer, config);

      toast.success("Answer posted");
      setAnswerText("");
      window.location.reload();

    } catch (error) {
      console.error("Error posting answer:", error);
      toast.error("Failed to post answer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (type) => {
    if (!user) {
      toast.error("Login to vote");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`https://betterknowit.onrender.com/api/questions/${question._id}/vote`, { type }, config);
      window.location.reload(); 
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:5173/r/${question.community_id?._id}/comments/${question._id}`);
    toast.success("Link copied to clipboard!");
  };

  if (isDeleted) return null;

  return (
    <div className="bg-[#1a1a1b] border border-[#343536] rounded-lg overflow-hidden hover:border-[#4a4a4b] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 mb-4 flex">

      <div className="flex-1">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              {/* Community Icon */}
              <div className="w-5 h-5 rounded-full bg-[#ff4500] flex items-center justify-center text-white text-[10px] font-bold">
                {question.community_id?.community_name?.substring(0, 1).toUpperCase() || 'C'}
              </div>

              <span className="font-bold text-white hover:underline cursor-pointer">
                r/{question.community_id?.community_name || 'community'}
              </span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">
                Posted by u/{question.user_id?.username || 'user'}
              </span>
              <span>•</span>
              <span>{formatDate(question.createdAt)}</span>
            </div>

            {user && (user._id === question.user_id?._id || user._id === question.user_id) && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  title="Edit Post"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button
                  onClick={handleDelete}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                  title="Delete Post"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mb-3">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full bg-[#1a1a1b] border border-[#343536] rounded p-2 text-white text-lg font-semibold focus:outline-none focus:border-white"
                rows="2"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={handleUpdate} className="flex items-center gap-1 px-3 py-1 bg-white text-black text-xs rounded-full font-bold hover:bg-gray-200">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1 bg-[#272729] text-gray-300 text-xs rounded-full hover:bg-[#343536] font-bold">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <Link to={`/post/${question._id}`}>
              <h2 className="text-white text-lg font-medium my-4 mt-2 leading-snug cursor-pointer">
                {question.question}
              </h2>
            </Link>
          )}

          <div className="flex items-center gap-2 my-4 ">
            <span className="bg-[#272729] text-orange-500 text-xs px-2 py-0.5 rounded-full border border-orange-500/20">
              Question #{question.question_id}
            </span>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="px-4 pb-4 flex items-center text-gray-400 text-sm font-bold gap-4">
          {/* Vote Buttons (Horizontal) */}
          <div className="flex items-center bg-[#272729] rounded-full">
            <button onClick={(e) => { e.preventDefault(); handleVote('up'); }} className="p-1 px-2 hover:bg-[#343536] rounded-l-full hover:text-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </button>
            <span className="px-1 text-white text-xs">{question.votes || 0}</span>
            <button onClick={(e) => { e.preventDefault(); handleVote('down'); }} className="p-1 px-2 hover:bg-[#343536] rounded-r-full hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          {/* Comments */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-2 py-1 hover:bg-[#272729] rounded-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span>{question.answers ? question.answers.length : 0} Answers</span>
          </button>

          {/* Share */}
          <button onClick={handleShare} className="flex items-center gap-2 px-2 py-1 hover:bg-[#272729] rounded-sm transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            <span>Share</span>
          </button>

          {/* Save */}
          <button className="flex items-center gap-2 px-2 py-1 hover:bg-[#272729] rounded-sm transition-colors ml-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            <span>Save</span>
          </button>
          {/* More Options */}
          <button className="hover:bg-[#272729] p-1 rounded-sm text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
          </button>
        </div>

        {isExpanded && (
          <div className="border-t border-[#343536] bg-[#141415] p-4">
            {/* Add Answer Form */}
            <form onSubmit={handleAnswerSubmit} className="mb-6 flex gap-3">
              <input
                type="text"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#1a1a1b] border border-[#343536] rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={submitting || !answerText.trim()}
                className="px-4 py-2 bg-orange-600 text-white text-sm font-bold rounded-full disabled:opacity-50 hover:bg-orange-500 transition-colors"
              >
                Reply
              </button>
            </form>

            <h3 className="text-white font-semibold mb-3">Answers</h3>
            {question.answers && question.answers.length > 0 ? (
              question.answers.map((answer, index) => (
                <AnswerCard key={index} answer={answer} />
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No answers yet. Be the first!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questioncard;