import { Link } from "react-router-dom";
import { FaGithub, FaHome,FaRobot } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white p-4 border-r border-gray-700">
            <h2 className="text-xl font-bold mb-6">DevConnect</h2>
            <ul className="space-y-4">
                <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <FaHome /> Dashboard
                    </Link>
                </li>
                <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/dashboard/github" className="flex items-center gap-2">
                        <FaGithub /> GitHub Stats
                    </Link>
                </li>
                <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/dashboard/career" className="flex items-center gap-2">
                        <FaRobot /> AI Career Insights
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
