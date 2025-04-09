import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Added for animations
import { useNavigate } from "react-router-dom"; // ✅ Navigation Hook

const Github = () => {
    const navigate = useNavigate(); // ✅ Navigation Hook
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGitHubData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User not authenticated");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/github/repos", {
                    headers: { Authorization: `Bearer ${token}` }, 
                });

                if (!response.ok) throw new Error("Failed to fetch GitHub repositories");

                const data = await response.json();
                setRepos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    if (loading) return <p className="text-center text-gray-400">Loading GitHub Data...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gradient-to-br from-gray-950 to-black text-white min-h-screen flex flex-col items-center">
            
 
            <motion.button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition-all duration-300 border-2 border-cyan-500 shadow-md hover:shadow-cyan-500/50 flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                ← Go to Dashboard
            </motion.button>

         
            <motion.h2 
                className="text-5xl font-extrabold mt-6 mb-6 text-center text-cyan-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
            >
                 💻 My GitHub Repositories
            </motion.h2>

         
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {repos.map((repo, index) => (
                    <motion.div 
                        key={repo.id} 
                        className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.6)" }}
                    >
                        <h3 className="text-xl font-semibold text-cyan-300">{repo.name}</h3>
                        <p className="text-gray-400 mt-2">{repo.description || "No description available"}</p>
                        <div className="mt-3 text-sm text-gray-500">
                            ⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}
                        </div>
                        <motion.a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block mt-4 text-cyan-400 hover:underline transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            View on GitHub →
                        </motion.a>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Github;