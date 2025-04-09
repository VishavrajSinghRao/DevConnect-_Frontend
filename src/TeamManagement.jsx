import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TeamChat from "./TeamChat"; // adjust path as needed
import { useNavigate } from "react-router-dom";

const TeamManagement = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [repoUrl, setRepoUrl] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchTeams();
        fetchUser();
    }, []);

    const fetchTeams = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/teams`);
            setTeams(res.data);
        } catch (err) {
            console.error("🔥 Error fetching teams:", err);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
        } catch (err) {
            console.error("🔥 Error fetching user:", err);
        }
    };

    const createTeam = async () => {
        try {
            const res = await axios.post(
                `${apiUrl}/api/teams/create`,
                { teamName, repoUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(res.data.message);
            setTeams([...teams, res.data.team]);
            fetchTeams();

            setTeamName("");
            setRepoUrl("");
            
        } catch (error) {
            console.error("🔥 Error creating team:", error);
            setMessage(error.response?.data?.error || "Failed to create team");
        }
    };

    const joinTeam = async (teamId) => {
        try {
            const res = await axios.post(
               `${apiUrl}/api/teams/join`,
                { teamId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(res.data.message);
            fetchTeams();
        } catch (error) {
            console.error("🔥 Error joining team:", error);
            setMessage(error.response?.data?.error || "Failed to join team");
        }
    };

    const leaveTeam = async (teamId) => {
        try {
            const res = await axios.post(
                `${apiUrl}/api/teams/leave`,
                { teamId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(res.data.message);
            fetchTeams();
        } catch (error) {
            console.error("🔥 Error leaving team:", error);
            setMessage(error.response?.data?.error || "Failed to leave team");
        }
    };

    const deleteTeam = async (teamId) => {
        try {
            await axios.delete(`${apiUrl}/api/teams/delete/${teamId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("✅ Team deleted successfully.");
            setTeams(teams.filter((team) => team._id !== teamId));
        } catch (error) {
            console.error("🔥 Error deleting team:", error);
            setMessage(error.response?.data?.error || "Failed to delete team");
        }
    };

    return (
        <div className="relative bg-gray-950 text-white min-h-screen pb-20">
            <div className="flex flex-col items-center p-10">
                <motion.h1
                    className="text-4xl font-extrabold mb-4 text-cyan-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Team Management
                </motion.h1>

                {message && (
                    <motion.p
                        className="text-center text-green-400 mb-4 bg-gray-800 p-3 rounded-lg border border-green-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {message}
                    </motion.p>
                )}

                {/* Create Team Section */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-500 w-full max-w-3xl mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-300">Create a New Team</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            className="bg-gray-800 text-white p-3 w-full rounded-md focus:ring-2 focus:ring-cyan-400"
                            placeholder="Enter team name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-gray-800 text-white p-3 w-full rounded-md focus:ring-2 focus:ring-cyan-400"
                            placeholder="Enter GitHub repo URL"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                        />
                        <button
                            className="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition"
                            onClick={createTeam}
                        >
                            Create
                        </button>
                    </div>
                </div>

                {/* Team List */}
                <h3 className="text-lg font-semibold mb-4 text-cyan-300">All Teams</h3>
                <div className="w-full max-w-3xl space-y-6">
                    {teams.map((team) => (
                        <motion.div
                            key={team._id}
                            className="bg-gray-800 p-6 rounded-lg shadow-md border border-cyan-500 transition hover:shadow-cyan-500"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div>
                                <p className="text-xl font-semibold text-cyan-400">{team.name}</p>
                                <p className="text-sm text-gray-400">Members: {team.members.length}</p>

                                {/* Members */}
                                <div className="flex flex-wrap mt-2">
                                    {team.members.map((member) => (
                                        <div key={member.userId?._id || member._id} className="flex items-center mr-4">
                                            <img
                                                src={member.userId?.avatarUrl}
                                                alt={member.userId?.username}
                                                className="w-8 h-8 rounded-full border border-cyan-400 mr-2"
                                            />
                                            <span className="text-sm text-gray-300">
                                                {member.userId?.username}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {team.repoUrl && (
                                    <p className="text-sm mt-2">
                                        <a
                                            href={team.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 font-semibold"
                                        >
                                            🔗 GitHub Repository
                                        </a>
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="bg-cyan-500/50 text-white px-4 py-2 rounded-md hover:scale-105 transition"
                                    onClick={() => joinTeam(team._id)}
                                >
                                    Join
                                </button>
                                <button
                                    className="bg-red-500/50 text-white px-4 py-2 rounded-md hover:scale-105 transition"
                                    onClick={() => leaveTeam(team._id)}
                                >
                                    Leave
                                </button>
                                <button
                                    className="bg-red-600/50 text-white px-4 py-2 rounded-md hover:scale-105 transition"
                                    onClick={() => deleteTeam(team._id)}
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Chat */}
                            {user && (
                                <TeamChat teamId={team._id} currentUser={user} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ✅ Fixed Bottom Back Button */}
            <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-cyan-500 p-4 flex justify-center z-50">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default TeamManagement;
