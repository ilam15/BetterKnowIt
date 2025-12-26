import { Link } from "react-router-dom";

const Rightsildebar = () => {
  const userStr = sessionStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-[300px] shrink-0 bg-[#030303] border-l border-[#343536] h-screen p-4 text-sm text-gray-300 fixed right-0 overflow-y-auto">

      {/* Auth Actions / User User Profile */}
      {!user ? (
        <div className="bg-[#1a1a1b] rounded-lg p-4 mb-4 border border-[#343536]">
          <h2 className="text-white font-bold text-base mb-2">BetterKnowIt Premium</h2>
          <p className="text-xs text-gray-400 mb-4">Sign up to vote and comment on the best community.</p>
          <div className="flex flex-col gap-2">
            <Link to="/login" className="w-full text-center py-2 rounded-full border border-orange-500 text-orange-500 font-bold hover:bg-orange-500/10 transition-colors">
              Log In
            </Link>
            <Link to="/register" className="w-full text-center py-2 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-500 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#1a1a1b] rounded-lg p-4 mb-4 border border-[#343536] text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mb-3 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold text-white text-lg">u/{user.username}</p>
          <p className="text-xs text-green-400 mt-1 flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
          </p>

          <div className="flex justify-between mt-6 px-4 text-xs border-t border-[#343536] pt-4">
            <div className="text-center">
              <p className="font-bold text-white text-base">12.5k</p>
              <p className="text-gray-500">Karma</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-base">Cake Day</p>
              <p className="text-gray-500">Oct 24</p>
            </div>
          </div>

          <button onClick={handleLogout} className="mt-4 w-full py-2 bg-[#272729] hover:bg-[#343536] text-white rounded-full font-semibold transition-colors text-xs">
            Log Out
          </button>
        </div>
      )}

      {/* Action Buttons - Moved from Left Sidebar */}
      <div className="mb-4 space-y-2">
        <Link to="/add-post" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/20 transform hover:scale-[1.02]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create Post
        </Link>
        <Link to="/create-community" className="flex items-center justify-center gap-2 w-full bg-[#1a1a1b] border border-[#343536] text-gray-300 py-3 rounded-xl font-bold hover:bg-[#272729] hover:text-white transition-all transform hover:scale-[1.02]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Create Community
        </Link>
      </div>


      {/* Trending / Hot Posts */}
      <div className="bg-[#1a1a1b] rounded-lg p-4 border border-[#343536]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hot on BetterKnowIt</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 group cursor-pointer">
            <div className="mt-1 min-w-[24px]">
              <span className="text-orange-500 font-bold text-lg">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors leading-snug">
                Localhost:5000 is refusing to connect. How to fix?
              </p>
              <p className="text-xs text-gray-500 mt-1">r/webdev • 452 comments</p>
            </div>
          </div>

          <div className="flex gap-3 group cursor-pointer">
            <div className="mt-1 min-w-[24px]">
              <span className="text-orange-500 font-bold text-lg">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors leading-snug">
                The new React compiler is insane!
              </p>
              <p className="text-xs text-gray-500 mt-1">r/reactjs • 1.2k comments</p>
            </div>
          </div>

          <div className="flex gap-3 group cursor-pointer">
            <div className="mt-1 min-w-[24px]">
              <span className="text-orange-500 font-bold text-lg">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors leading-snug">
                Why I switched from VS Code to Neovim
              </p>
              <p className="text-xs text-gray-500 mt-1">r/programming • 890 comments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 text-xs text-gray-500 space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="hover:underline cursor-pointer">User Agreement</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
        </div>
        <p>© 2024 BetterKnowIt, Inc. All rights reserved.</p>
      </div>

    </aside>
  );
}

export default Rightsildebar
