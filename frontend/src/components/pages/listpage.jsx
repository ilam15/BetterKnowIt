import { useEffect, useState } from "react";
import axios from "axios";
import Questioncard from "../cards/questioncard";

const Listpage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`http://localhost:5000/api/questions?sort=${sortBy}`, config);
        await new Promise(resolve => setTimeout(resolve, 500));
        let data = response.data;

        // Client side filtering for 'answered/unanswered' as backend might not support it yet
        if (filterBy === 'answered') {
          data = data.filter(q => q.answers && q.answers.length > 0);
        } else if (filterBy === 'unanswered') {
          data = data.filter(q => !q.answers || q.answers.length === 0);
        }

        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [sortBy, filterBy]);


  const QuestionSkeleton = () => (
    <div className="bg-[#1a1a1b] border border-[#343536] rounded-lg overflow-hidden animate-pulse">
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-[#272729]"></div>
          <div className="h-3 w-24 bg-[#272729] rounded"></div>
          <div className="h-3 w-16 bg-[#272729] rounded"></div>
        </div>
        <div className="h-6 bg-[#272729] rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-[#272729] rounded w-20"></div>
      </div>
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="h-8 w-32 bg-[#272729] rounded-full"></div>
        <div className="h-8 w-24 bg-[#272729] rounded-full"></div>
        <div className="h-8 w-24 bg-[#272729] rounded-full"></div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
          <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500/30 animate-ping"></div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No Questions Yet</h3>
      <p className="text-gray-400 text-center max-w-md mb-6">
        Be the first to ask a question and start the conversation!
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-full hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50">
        Ask a Question
      </button>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mb-6">
        <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-400 text-center max-w-md mb-6">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-[#272729] text-white font-semibold rounded-full hover:bg-[#343536] transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  );

  return (

    <main className="flex-1 bg-[#030303] px-4 pb-3 min-h-screen">
      <div className="mb-6 space-y-4">
        <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 rounded-2xl p-6 overflow-hidden group hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="font-bold text-lg text-white">Today's Top Growing Communities</p>
            </div>
            <p className="text-white/90 text-sm">Discover the most engaging questions and discussions</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Sort by:</span>
            <div className="flex gap-2">
              {['recent', 'popular', 'trending'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${sortBy === option
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-[#1a1a1b] text-gray-400 hover:bg-[#272729] hover:text-white border border-[#343536]'
                    }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Filter:</span>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 bg-[#1a1a1b] text-white rounded-full text-sm font-semibold border border-[#343536] hover:bg-[#272729] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
            >
              <option value="all">All Questions</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>
          </div>
        </div>

        {/* Question count badge */}
        {!loading && !error && questions.length > 0 && (
          <div className="flex items-center gap-5">
            <div className="px-4 py-2 bg-[#1a1a1b] border border-[#343536] rounded-full inline-flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-300 flex gap-2 justify-center items-center">
                <span className="font-bold text-white text-lg">{questions.length}</span> {questions.length === 1 ? 'Question' : 'Questions'} Available
              </span>
            </div>
          </div>
        )}
      </div>


      {/* Content Section */}
      <div className="space-y-4">
        {loading ? (
          // Loading state with skeletons
          <>
            <QuestionSkeleton />
            <QuestionSkeleton />
            <QuestionSkeleton />
          </>
        ) : error ? (
          // Error state
          <ErrorState />
        ) : questions.length === 0 ? (
          // Empty state
          <EmptyState />
        ) : (
          // Questions list with staggered animation
          questions.map((question, index) => (
            <div
              key={question._id}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              <Questioncard question={question} />
            </div>
          ))
        )}
      </div>

      {/* Load more button (if needed) */}
      {!loading && !error && questions.length > 0 && (
        <div className="flex justify-center mt-8 pb-8">
          <button className="px-8 py-3 bg-[#1a1a1b] text-white font-semibold rounded-full border border-[#343536] hover:bg-[#272729] hover:border-orange-500/50 transition-all duration-300 group">
            <span className="flex items-center gap-2">
              Load More Questions
              <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </main>
  );
};

export default Listpage;
