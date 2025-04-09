import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white flex flex-col">
            {/* Top Left Branding */}
            <motion.div 
                className="absolute top-6 left-6 md:text-4xl text-2xl font-serif font-bold text-cyan-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                DevConnect
            </motion.div>

            {/* Floating Animated Heading */}
            <motion.div
                className="flex flex-1 flex-col items-center justify-center text-center px-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                <motion.h1 
                    className="text-5xl font-extrabold mb-4 text-cyan-300"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    Welcome to DevConnect
                </motion.h1>
                <p className="text-lg text-gray-400 max-w-2xl mb-6">
                    Connect with developers, analyze your GitHub profile, and get AI-powered career suggestions.
                </p>

                <button 
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded text-lg transition"
                >
                    Get Started
                </button>
            </motion.div>

            {/* 🔥 Let's Connect with the Owner Section */}
            <motion.div 
                className="absolute bottom-16 right-6 bg-gray-800 p-4 rounded-xl shadow-lg flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <img 
                    src="https://avatars.githubusercontent.com/u/147024882?v=4" 
                    alt="Owner Avatar"
                    className="w-12 h-12 rounded-full border-2 border-cyan-400"
                />
                <div>
                    <p className="text-gray-300 text-sm">Want to connect with the creator?</p>
                    <a 
                        href="https://vishport.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                    >
                        Let's Connect with the Owner →
                    </a>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="absolute bottom-6 text-gray-500 w-full text-center">
                <p>© 2024 DevConnect | <a href="https://github.com/VishavrajSinghRao" className="text-cyan-400">GitHub</a></p>
            </footer>
        </div>
    );
};

export default Home;
