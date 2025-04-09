import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Github from "./Github";
import AISuggestions from "./AISuggestion";
import UserProfile from "./UserProfile";
import Profile from "./Profile";
import CareerAI from "./CareerAI";
import TrendingIssues from "./TrendingIssues";
import TeamManagement from "./TeamManagement";

function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/github" element={<Github />} />
                <Route path="/user/:username" element={<UserProfile />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/career" element={<CareerAI />} />
                <Route path="/trending-issues" element={<TrendingIssues />} />
                <Route path="/ai-suggestions" element={<AISuggestions />} />
                <Route path="/teams" element={<TeamManagement />} />

                <Route 
                    path="/dashboard" 
                    element={
                     
                            <Dashboard />
                      
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
