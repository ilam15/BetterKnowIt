import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Check, X, Camera } from 'lucide-react';
import Questioncard from '../cards/questioncard';

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editBio, setEditBio] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    const userStr = sessionStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        const fetchUserPosts = async () => {
            let userIdToFetch = id;
            if (!userIdToFetch && currentUser) {
                userIdToFetch = currentUser._id;
            }
            if (!userIdToFetch) return;

            try {
                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get(`https://betterknowit.onrender.com/api/questions?user_id=${userIdToFetch}`, config);
                setUserPosts(response.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };
        fetchUserPosts();
    }, [id, currentUser?._id]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let userIdToFetch = id;
                if (!userIdToFetch && currentUser) {
                    userIdToFetch = currentUser._id;
                }

                if (!userIdToFetch) {
                    setLoading(false);
                    return;
                }

                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('https://betterknowit.onrender.com/api/profiles', config);
                const userProfile = response.data.find(p => p.user_id && (p.user_id._id === userIdToFetch || p.user_id === userIdToFetch));

                if (userProfile) {
                    setProfile(userProfile);
                    setEditBio(userProfile.bio || "");
                } else {
                    if (currentUser && currentUser._id === userIdToFetch) {
                        setProfile({
                            temp: true, 
                            user_id: currentUser,
                            bio: "Welcome to my profile!",
                            location: "Unknown"
                        });
                        setEditBio("Welcome to my profile!");
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id, currentUser?._id]);

    const handleSaveProfile = async () => {
        if (!currentUser) return;

        try {
            if (profile.temp) {
                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const res = await axios.post('https://betterknowit.onrender.com/api/profiles', {
                    user_id: currentUser._id,
                    bio: editBio,
                    location: "Earth"
                }, config);
                setProfile({ ...res.data, user_id: currentUser });
                toast.success("Profile created!");
            } else {
                const token = sessionStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const res = await axios.put(`https://betterknowit.onrender.com/api/profiles/${profile._id}`, {
                    bio: editBio
                }, config);
                setProfile({ ...res.data, user_id: profile.user_id });
                toast.success("Profile updated!");
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to save profile");
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (!profile) return <div className="text-white text-center mt-20">Profile not found</div>;

    const isOwnProfile = currentUser && (profile.user_id._id === currentUser._id || profile.user_id === currentUser._id);

    return (
        <main className="bg-[#030303] min-h-screen pt-4 px-4">
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Avatar & Info */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1a1a1b] border border-[#343536] rounded-xl overflow-hidden relative">
                        {/* Cover Blob */}
                        <div className="h-24 bg-gradient-to-r from-orange-600 to-orange-400 group relative">
                            {isEditing && (
                                <button className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white" />
                                </button>
                            )}
                        </div>

                        <div className="px-4 pb-4">
                            {/* Avatar */}
                            <div className="relative -mt-10 mb-3">
                                <div className="w-20 h-20 rounded-full bg-[#1a1a1b] p-1 inline-block relative group">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-3xl font-bold text-white shadow-lg overflow-hidden">
                                        {profile.user_id?.username?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    {isEditing && (
                                        <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera size={20} className="text-white" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h1 className="text-xl font-bold text-white leading-tight">
                                {profile.user_id?.username || 'User'}
                            </h1>
                            <p className="text-gray-400 text-sm mb-4">u/{profile.user_id?.username || 'user'}</p>

                            {isOwnProfile && (
                                !isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/20 mb-4"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2 mb-4">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="flex-1 py-2 rounded-full bg-green-600 text-white font-bold text-sm hover:bg-green-500 transition-colors flex items-center justify-center gap-1"
                                        >
                                            <Check size={16} /> Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-2 rounded-full bg-[#272729] text-gray-300 font-bold text-sm hover:bg-[#343536] transition-colors flex items-center justify-center gap-1"
                                        >
                                            <X size={16} /> Cancel
                                        </button>
                                    </div>
                                )
                            )}

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-white font-bold">1</p>
                                    <p className="text-xs text-gray-500">Post Karma</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold">0</p>
                                    <p className="text-xs text-gray-500">Comment Karma</p>
                                </div>
                            </div>

                            {isEditing ? (
                                <div className="mb-4">
                                    <label className="text-xs text-gray-500 mb-1 block">Bio</label>
                                    <textarea
                                        value={editBio}
                                        onChange={(e) => setEditBio(e.target.value)}
                                        className="w-full bg-[#030303] border border-[#343536] rounded p-2 text-white text-sm focus:outline-none focus:border-orange-500"
                                        rows="3"
                                        placeholder="Write something about yourself..."
                                    />
                                </div>
                            ) : (
                                <div className="text-sm text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
                                    {profile.bio || "No bio yet."}
                                </div>
                            )}

                            <div className="flex flex-col gap-2 text-xs text-gray-400 border-t border-[#343536] pt-4">
                                <span className="flex items-center gap-2">
                                    🎂 Cake day <span className="text-white">Oct 24, 2024</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content Feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm whitespace-nowrap">Overview</button>
                        <button className="px-5 py-2 rounded-full bg-[#1a1a1b] text-gray-400 hover:bg-[#272729] font-bold text-sm border border-[#343536] transition-colors whitespace-nowrap">Posts</button>
                        <button className="px-5 py-2 rounded-full bg-[#1a1a1b] text-gray-400 hover:bg-[#272729] font-bold text-sm border border-[#343536] transition-colors whitespace-nowrap">Comments</button>
                        <button className="px-5 py-2 rounded-full bg-[#1a1a1b] text-gray-400 hover:bg-[#272729] font-bold text-sm border border-[#343536] transition-colors whitespace-nowrap">Saved</button>
                    </div>

                    {/* Posts Feed */}
                    {userPosts.length > 0 ? (
                        userPosts.map(post => (
                            <Questioncard key={post._id} question={post} />
                        ))
                    ) : (
                        /* Placeholder Content */
                        <div className="bg-[#1a1a1b] border border-[#343536] rounded-xl p-10 text-center">
                            <div className="w-16 h-16 bg-[#272729] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No posts yet</h3>
                            <p className="text-gray-400 text-sm">u/{profile.user_id?.username} hasn't posted anything yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
