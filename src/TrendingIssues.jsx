import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrendingIssues = () => {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [tech, setTech] = useState("React");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [collaboratorUsername, setCollaboratorUsername] = useState("");

    useEffect(() => {
        fetchIssues();
    }, [tech]);

    const fetchIssues = async () => {
        setLoading(true);
        setError(null);
        setIssues([]);

        const userToken = localStorage.getItem("token");

        if (!userToken) {
            console.error("❌ GitHub token is missing!");
            setError("GitHub token is missing. Please log in.");
            setLoading(false);
            return;
        }

        console.log("🔑 Sending GitHub Token:", userToken);

        try {
            const response = await axios.get(`http://localhost:5000/api/trending-issues?tech=${tech}`, {
                headers: { Authorization: `Bearer ${userToken}` },
            });

            console.log("✅ Issues Fetched:", response.data);
            setIssues(response.data);
        } catch (error) {
            console.error("❌ Error fetching trending issues:", error.response?.data || error.message);
            setError("Failed to fetch trending issues.");
        }

        setLoading(false);
    };

    const sendCollaborationRequest = async () => {
        const userToken = localStorage.getItem("token");
    
        if (!userToken) {
            alert("❌ User not logged in!");
            return;
        }
    
        // ✅ Decode token to get the user ID
        const decodedToken = JSON.parse(atob(userToken.split(".")[1]));  
        const senderId = decodedToken.id;  // Extract user ID
    
        if (!selectedIssue || !collaboratorUsername) {
            alert("❌ Please enter a GitHub username!");
            return;
        }
    
        try {
            console.log("🔹 Fetching receiver ID for:", collaboratorUsername);
    
            // Fetch receiver ID from backend
            const userResponse = await axios.get(`http://localhost:5000/api/collaboration/user/username/${collaboratorUsername}`);
    
            console.log("✅ Receiver User Data:", userResponse.data);
    
            if (!userResponse.data || !userResponse.data.id) {
                alert("❌ User not found in database!");
                return;
            }
    
            const receiverId = userResponse.data.id;
    
            console.log("✅ Sending collaboration request with receiverId:", receiverId);
    
            // Send collaboration request
            const response = await axios.post(
                "http://localhost:5000/api/collaboration/collaborate",
                {
                    issueUrl: selectedIssue.html_url,
                    senderId, // ✅ Use extracted sender ID
                    receiverId,
                    message: "Let's work on this issue together!",
                },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
    
            console.log("✅ Request Sent Successfully:", response.data);
            alert(response.data.message);
        } catch (error) {
            console.error("🔥 Frontend Error:", error.response?.data || error);
            alert(error.response?.data?.error || "Failed to send collaboration request.");
        }
    };
    
    

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-950 p-6">
            {/* GitHub-Style Container */}
            <div className="max-w-2xl w-full bg-gray-900 text-gray-100 rounded-lg shadow-lg p-6 border border-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">🔥 Trending Issues</h2>

                {/* Tech Selection Dropdown */}
                <div className="flex justify-center mb-6 relative">
                    <motion.select
                        onChange={(e) => setTech(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                        className={`p-3 text-lg font-semibold text-white bg-gray-800 
                                   border border-gray-700 rounded-lg shadow-md transition-all duration-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   ${
                                       isOpen
                                           ? "border-blue-500 shadow-blue-500/50 scale-105"
                                           : "hover:border-blue-500 hover:shadow-blue-500/40"
                                   }`}
                        whileHover={{ y: -3 }}
                        whileFocus={{ scale: 1.05, boxShadow: "0px 10px 40px rgba(0, 255, 255, 0.4)" }}
                    >
                        <option className="bg-gray-900 text-cyan-300" value="React">⚛️ React</option>
                        <option className="bg-gray-900 text-green-300" value="Node.js">🌿 Node.js</option>
                        <option className="bg-gray-900 text-blue-400" value="Next.js">🚀 Next.js</option>
                        <option className="bg-gray-900 text-yellow-300" value="Python">🐍 Python</option>
                    </motion.select>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center my-4">
                        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                    </div>
                )}

                {/* Error Message */}
                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

                {/* Issue List */}
                {issues.length > 0 ? (
                    <motion.ul 
                        className="space-y-4 mt-4"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }}
                    >
                        {issues.map((issue) => (
                           <motion.li 
                           key={issue.id} 
                           className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md border border-gray-700"
                           whileHover={{ scale: 1.03 }}
                       >
                           <div className="flex justify-between items-start gap-4 flex-wrap">
                               <a 
                                   href={issue.html_url} 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-cyan-400 font-medium hover:text-blue-400 transition text-lg flex-1"
                               >
                                   {issue.title}
                               </a>
                       
                               <motion.button
                                   onClick={() => setSelectedIssue(issue)}
                                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all whitespace-nowrap"
                                   whileHover={{ scale: 1.05 }}
                               >
                                   🤝 Collaborate
                               </motion.button>
                           </div>
                       </motion.li>
                       
                        ))}
                    </motion.ul>
                ) : (
                    !loading && <p className="text-gray-400 mt-4 text-center">❌ No Issues Found</p>
                )}

                {/* Collaboration Modal */}
                {selectedIssue && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-gray-900 p-6 rounded-lg text-white w-96">
                            <h3 className="text-xl font-bold">🤝 Find a Collaborator</h3>
                            <p className="text-gray-400">Enter a GitHub username to collaborate on:</p>
                            <p className="text-cyan-400">{selectedIssue.title}</p>

                            <input
                                type="text"
                                placeholder="GitHub Username"
                                value={collaboratorUsername}
                                onChange={(e) => setCollaboratorUsername(e.target.value)}
                                className="w-full p-2 mt-3 bg-gray-800 rounded border border-gray-700"
                            />

                            <div className="flex justify-between mt-4">
                                <button 
                                    onClick={sendCollaborationRequest}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                                >
                                    ✅ Send Request
                                </button>
                                <button 
                                    onClick={() => setSelectedIssue(null)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 🚀 Go to Dashboard Button */}
                <div className="flex justify-center mt-6">
                    <motion.button
                        onClick={() => navigate("/dashboard")}
                        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 border-2 border-blue-500 shadow-md hover:shadow-blue-500/50 flex items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Go to Dashboard
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default TrendingIssues;
