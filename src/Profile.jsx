import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaGithub, FaTachometerAlt } from "react-icons/fa";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchUsername, setSearchUsername] = useState("");
    const [searchedUser, setSearchedUser] = useState(null);
    const [searchedRepos, setSearchedRepos] = useState([]);
    const apiUrl = "https://devconnect-backend-2iqt.onrender.com";

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found! Please log in.");
                    setLoading(false);
                    return;
                }

                const userResponse = await fetch(`${apiUrl}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = await userResponse.json();
                if (userResponse.ok) {
                    setUser(userData);
                } else {
                    setError(userData.error || "Failed to fetch profile.");
                    setLoading(false);
                    return;
                }

                const repoResponse = await fetch(`${apiUrl}/api/github/repos`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const repoData = await repoResponse.json();
                if (repoResponse.ok) {
                    setRepos(repoData);
                }
            } catch (error) {
                setError("Network error, please try again.");
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const searchUser = async () => {
        if (!searchUsername) {
            alert("Enter a GitHub username to search!");
            return;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${searchUsername}`);
            const data = await response.json();

            if (data.message === "Not Found") {
                alert("User not found!");
                return;
            }

            setSearchedUser(data);

            const repoResponse = await fetch(`https://api.github.com/users/${searchUsername}/repos`);
            const repoData = await repoResponse.json();
            setSearchedRepos(repoData);
        } catch (error) {
            alert("Failed to fetch user. Try again!");
        }
    };

    if (loading) return <p className="text-gray-400 text-center mt-10">Loading profile...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white flex flex-col items-center p-6">
            
            {/* ✅ Go to Dashboard Button */}
            <motion.button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold shadow-lg border-2 border-cyan-400 flex items-center gap-2 transition-all mb-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaTachometerAlt /> Go to Dashboard
            </motion.button>

            {/* ✅ Search Box */}
            <div className="mb-6 flex gap-3">
                <input
                    type="text"
                    placeholder="Search GitHub User..."
                    className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-center focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                />
                <motion.button
                    onClick={searchUser}
                    className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-2 font-semibold shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaSearch /> Search
                </motion.button>
            </div>

            {/* ✅ Searched User Profile */}
            {searchedUser && (
                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg text-center border-2 border-cyan-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={searchedUser.avatar_url} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto border-4 border-cyan-500" />
                    <h2 className="text-2xl font-bold mt-3">{searchedUser.login}</h2>
                    <p className="text-gray-400">{searchedUser.followers} Followers | {searchedUser.following} Following</p>
                </motion.div>
            )}

            {/* ✅ Searched User Repositories */}
            {searchedRepos.length > 0 && (
                <motion.div
                    className="mt-6 w-full max-w-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-xl font-semibold text-cyan-400 mb-4">🎯 {searchedUser.login}'s Repositories</h3>
                    <ul className="space-y-4">
                        {searchedRepos.map((repo, index) => (
                            <motion.li
                                key={index}
                                className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-600 flex justify-between items-center transition-all hover:bg-gray-700"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div>
                                    <h4 className="text-lg font-bold text-gray-200">{repo.name}</h4>
                                    <p className="text-gray-400">{repo.language || "No language specified"}</p>
                                </div>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm">
                                    View Repo
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* ✅ Logged-in User Profile */}
            {user && (
                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg text-center border-2 border-cyan-400 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto border-4 border-cyan-500" />
                    <h2 className="text-2xl font-bold mt-3">{user.username}</h2>
                    <p className="text-gray-400">{user.followers?.length || 0} Followers | {user.following?.length || 0} Following</p>
                </motion.div>
            )}
        </div>
    );
};

export default Profile;
