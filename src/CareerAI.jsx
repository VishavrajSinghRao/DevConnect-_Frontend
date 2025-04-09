import { useState } from "react";
import { motion } from "framer-motion"; 
import { FaRobot, FaArrowRight } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // ✅ For Navigation

const CareerAI = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState("");

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setSuggestions("Based on your GitHub profile, AI suggests you focus on Backend Development and Open Source Contributions.");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="relative bg-gradient-to-br from-gray-950 to-black text-white min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
            
            {/* ✅ Floating Particles Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-30 pointer-events-none"></div>

            {/* ✅ Animated Header */}
            <motion.h1 
                className="text-5xl font-extrabold mb-6 text-cyan-400 text-center flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }} 
            >
                <FaRobot className="text-cyan-300 animate-spin-slow" /> AI-Powered Career Selection
            </motion.h1>

            {/* ✅ Animated Description */}
            <motion.p 
                className="text-gray-400 text-center max-w-lg mb-6 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }} 
            >
                Get AI-driven career suggestions based on your GitHub profile.
            </motion.p>

            {/* ✅ Button Container */}
            <div className="flex flex-col gap-4 items-center">
                
                {/* ✅ AI Suggestion Button */}
                <motion.button 
                    onClick={handleGenerate} 
                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-lg transition-all font-semibold shadow-lg 
                               border-2 border-cyan-500 hover:shadow-cyan-500/50 hover:border-cyan-300 tracking-wide 
                               hover:scale-110 active:scale-95"
                    disabled={loading}
                    whileHover={{ scale: 1.1, rotate: 2 }} 
                    whileTap={{ scale: 0.95 }}
                >
                    {loading ? "Analyzing..." : "✨ Get AI Suggestions"}
                </motion.button>

                {/* ✅ Go to AI Suggestions Button */}
                <motion.button 
                    onClick={() => navigate("/ai-suggestions")} 
                    className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-cyan-300 rounded-lg text-lg transition-all font-semibold shadow-lg 
                               border-2 border-cyan-500 hover:shadow-cyan-500/50 hover:border-cyan-300 tracking-wide 
                               flex items-center gap-2 hover:scale-110 active:scale-95"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Go to AI Suggestions <FaArrowRight />
                </motion.button>

            </div>

            {/* ✅ AI Response Section */}
            {suggestions && (
                <motion.div 
                    className="mt-6 bg-gray-800 p-6 rounded-lg max-w-lg text-center border-2 border-cyan-500 shadow-lg 
                               backdrop-blur-md transition-all duration-500 hover:shadow-cyan-400/40"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }} 
                >
                    <h2 className="text-2xl font-semibold text-cyan-300">✨ AI Suggestions:</h2>
                    <motion.p 
                        className="text-gray-300 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        {suggestions}
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
};

export default CareerAI;
