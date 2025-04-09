import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaSignOutAlt, FaHome, FaChartBar, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion"; 

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromURL = queryParams.get("token");

        if (tokenFromURL) {
            localStorage.setItem("token", tokenFromURL);
            navigate("/dashboard", { replace: true });
        } else {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                navigate("/login");
            } else {
                const payload = JSON.parse(atob(storedToken.split(".")[1]));
                setUser(payload);
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="h-screen flex bg-gradient-to-br from-gray-950 to-black text-white">
            
           
            <motion.div 
                className={`p-4 flex flex-col justify-between border-r border-cyan-500 shadow-lg transition-all bg-opacity-80 backdrop-blur-lg`}
                style={{ width: isSidebarOpen ? "250px" : "70px", height: "100vh" }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div>
                  
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                        className="text-cyan-400 p-3 w-full flex items-center justify-center hover:bg-gray-800 rounded transition-all"
                    >
                        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>

                  
                    {isSidebarOpen && (
                        <motion.h2 
                            className="text-3xl font-bold mb-6 text-cyan-400 text-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            DevConnect
                        </motion.h2>
                    )}

                    {user && (
                        <motion.div 
                            className="flex items-center gap-4 mb-6 p-3 bg-gray-800 rounded-lg shadow-lg border border-cyan-500 transition-all"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <img src={user.avatar} alt="User Avatar" className="w-14 h-14 rounded-full border-2 border-cyan-500" />
                            <div className={`truncate ${isSidebarOpen ? "max-w-full" : "hidden"}`}>
                                <p className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-cyan-300">
                                    {user.username}
                                </p>
                                <p className="text-sm text-gray-400">GitHub User</p>
                            </div>
                        </motion.div>
                    )}

                   
                    <nav className="space-y-4">
                        {[{ name: "Home", icon: <FaHome />, path: "/" },
                          { name: "GitHub Stats", icon: <FaGithub />, path: "/github" },
                          { name: "AI Suggestions", icon: <FaChartBar />, path: "/ai-suggestions" },
                          { name: "View Profile", icon: <FaUser />, path: "/profile" },
                          { name: "Trending Issues", icon: <FaUser />, path: "/trending-issues" },
                          { name: "Teams", icon: <FaUser />, path: "/teams" }
                        ].map((item, index) => (
                            <motion.button 
                                key={index} 
                                onClick={() => navigate(item.path)} 
                                className="flex items-center gap-3 p-3 w-full hover:bg-gray-800 rounded transition-all text-gray-300 hover:text-cyan-400"
                                whileHover={{ scale: 1.05, backgroundColor: "rgb(22, 78, 99)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.icon} {isSidebarOpen && item.name}
                            </motion.button>
                        ))}
                    </nav>
                </div>

                <motion.button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 p-3 w-full bg-red-600 hover:bg-red-700 rounded transition-all text-white shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaSignOutAlt /> {isSidebarOpen && "Logout"}
                </motion.button>
            </motion.div>

            
            <motion.div 
                className="flex-1 p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              
                <motion.h1 
                    className="text-4xl font-extrabold mb-6 text-cyan-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Dashboard
                </motion.h1>

               
                {user && (
                    <motion.div 
                        className="bg-gray-800 p-6 rounded-lg flex items-center gap-6 shadow-lg border border-cyan-500 transition-all hover:shadow-cyan-500"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-cyan-500" />
                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400">{user.username}</h2>
                            <p className="text-gray-400">Welcome to DevConnect!</p>
                        </div>
                    </motion.div>
                )}

               
                <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-gray-400 text-lg">🚀 More features coming soon...</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
