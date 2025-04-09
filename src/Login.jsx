import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
    const [githubToken, setGithubToken] = useState("");
    const [forceLogin, setForceLogin] = useState(false);
    const [showSteps, setShowSteps] = useState(false); // ✅ State for login steps modal

    const handleOAuthLogin = () => {
        const loginURL = `http://localhost:5000/auth/github?force_login=${forceLogin}`;
        window.location.href = loginURL;
    };

    const handlePATLogin = async () => {
        if (!githubToken) {
            alert("Please enter your GitHub Personal Access Token (PAT).");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5000/auth/github/pat", { githubToken });

            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            alert("Invalid GitHub Token! Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-gray-900 to-black text-white">
            <motion.div 
                className="p-8 bg-gray-800 rounded-lg shadow-xl w-96 border border-cyan-500 relative"
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
                whileHover={{ boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.7)", scale: 1.02 }}
            >
                <motion.h2 
                    className="text-3xl font-bold text-center mb-6 text-cyan-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Login 🚀
                </motion.h2>

                {/* ✅ Login with Personal Access Token (PAT) */}
                <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <label className="block mb-2 text-sm text-gray-400">Login with Personal Access Token (PAT)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="password"
                            placeholder="Enter GitHub PAT"
                            className="flex-1 p-2 bg-gray-700 rounded border border-cyan-500 focus:ring-2 focus:ring-cyan-400"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                        />
                        <motion.button 
                            onClick={handlePATLogin} 
                            className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    </div>
                </motion.div>

                {/* ✅ Force GitHub Reauthorization */}
                <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <input 
                        type="checkbox" 
                        checked={forceLogin} 
                        onChange={() => setForceLogin(!forceLogin)} 
                        className="mr-2"
                    />
                    <label>Force GitHub Reauthorization</label>
                </motion.div>

                {/* ✅ Login with GitHub OAuth */}
                <motion.button 
                    onClick={handleOAuthLogin} 
                    className="w-full p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Login with GitHub
                </motion.button>

                {/* ✅ Steps to Login Button */}
                <motion.button 
                    onClick={() => setShowSteps(true)} 
                    className="w-full p-3 mt-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Steps to Login
                </motion.button>
            </motion.div>

            {/* ✅ Login Steps Modal */}
            {showSteps && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div 
                        className="bg-gray-900 text-white p-6 rounded-lg w-80 shadow-lg border border-cyan-500"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-xl font-bold mb-4 text-cyan-400">Steps to Login</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                            <li>Click on "Login with GitHub" to authenticate.</li>
                            <li>If prompted, authorize DevConnect to access your GitHub data.</li>
                            <li>Alternatively, enter your GitHub PAT and click "Login".</li>
                            <li>After login, you will be redirected to your dashboard.</li>
                        </ul>
                        <button 
                            onClick={() => setShowSteps(false)} 
                            className="mt-4 w-full p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Login;
