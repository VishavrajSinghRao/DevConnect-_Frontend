import { useState } from "react";
import axios from "axios";
import { FaGithub, FaArrowLeft, FaCode, FaTachometerAlt, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AISuggestions = () => {
    const navigate = useNavigate();
    const [githubUsername, setGithubUsername] = useState("");
    const [careerSuggestion, setCareerSuggestion] = useState("");
    const [openSourceProjects, setOpenSourceProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewOpenSource, setViewOpenSource] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchAISuggestions = async () => {
        if (!githubUsername) {
            alert("Enter your GitHub username!");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${apiUrl}/api/ai-suggestions`, { githubUsername });
            setCareerSuggestion(data.careerSuggestion);
            setOpenSourceProjects(data.openSourceProjects);
        } catch (error) {
            alert("Failed to get AI suggestions & open-source projects.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white flex flex-col items-center justify-center p-6">

            {/* ✅ Animated Title */}
            <motion.h2
                className="text-5xl font-extrabold mb-6 text-center flex items-center gap-3 text-cyan-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
            >
                {viewOpenSource ? <FaCode className="text-cyan-400" /> : "🚀 AI-Powered Career Suggestions"}
            </motion.h2>

            {/* ✅ Navigation Buttons */}
            <div className="flex gap-6 mb-6">
                <motion.button
                    className={`p-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 border-2 shadow-lg ${!viewOpenSource
                            ? "bg-cyan-600 hover:bg-cyan-700 border-cyan-400 shadow-cyan-500/50"
                            : "bg-gray-700 hover:bg-gray-600 border-gray-500 shadow-gray-600/50"
                        }`}
                    onClick={() => {
                        setViewOpenSource(false);
                        setCareerSuggestion("");
                        navigate('/career')
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaArrowLeft /> Career Suggestions
                </motion.button>

                <motion.button
                    className={`p-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 border-2 shadow-lg ${viewOpenSource
                            ? "bg-cyan-600 hover:bg-cyan-700 border-cyan-400 shadow-cyan-500/50"
                            : "bg-gray-700 hover:bg-gray-600 border-gray-500 shadow-gray-600/50"
                        }`}
                    onClick={() => setViewOpenSource(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaGithub /> Open Source Projects
                </motion.button>
            </div>

            {/* ✅ GitHub Username Input & Button */}
            <AnimatePresence mode="wait">
                {!viewOpenSource && (
                    <motion.div
                        key="careerInput"
                        className="flex flex-col items-center gap-4 w-full max-w-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <input
                            type="text"
                            placeholder="Enter Your GitHub Username"
                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-center focus:outline-none focus:border-cyan-500 transition-all duration-300"
                            value={githubUsername}
                            onChange={(e) => setGithubUsername(e.target.value)}
                        />
                        <motion.button
                            onClick={fetchAISuggestions}
                            className="w-full p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get AI Suggestions
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ✅ AI Career Suggestions */}
            <AnimatePresence>
                {!viewOpenSource && careerSuggestion && (
                    <motion.div
                        key="careerSuggestion"
                        className="bg-gray-800 p-6 mt-8 rounded-xl shadow-lg max-w-2xl text-center border-2 border-cyan-500 shadow-cyan-500/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold mb-3 text-cyan-400">Your AI-Powered Career Suggestion:</h3>
                        <p className="text-gray-300">{careerSuggestion}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ✅ Open Source Projects Section */}
            {viewOpenSource && (
                <motion.div
                    className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl border-2 border-cyan-500 shadow-cyan-500/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-xl font-semibold mb-3 text-cyan-400">🔥 Trending Open-Source Projects</h3>
                    <ul className="space-y-3">
                        {openSourceProjects.length === 0 ? (
                            <p className="text-gray-400">No projects available. Try fetching AI suggestions first.</p>
                        ) : (
                            openSourceProjects.map((repo, index) => (
                                <motion.li
                                    key={index}
                                    className="bg-gray-700 p-4 rounded-lg flex items-center justify-between transition-all hover:bg-gray-600 border-2 border-gray-600 shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 hover:underline flex items-center gap-2"
                                    >
                                        <FaGithub className="text-xl" />
                                        ⭐ {repo.stars} - {repo.owner}/{repo.name}
                                    </a>
                                </motion.li>
                            ))
                        )}
                    </ul>
                </motion.div>
            )}

            {/* ✅ Go to Dashboard or AI Suggestions Button */}
            <motion.button
                className="mt-8 p-3 px-6 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 flex items-center gap-2 transition-all"
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaTachometerAlt />  Go to Dashboard
            </motion.button>

        </div>
    );
};

export default AISuggestions;
