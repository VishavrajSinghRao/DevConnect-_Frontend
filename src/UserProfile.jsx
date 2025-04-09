import axios from 'axios';
import React, { useState } from 'react'

const apiUrl = process.env.REACT_APP_API_URL;
const UserProfile = ({username}) => {
        const [userData , setuserData] = useState(null);
        const [repos , setRepos] = useState([]);

        const fetchUserProfile =async () =>{
            try{
                const {data} = await axios.get(`${apiUrl}/api/github/user/${username}`);
                setuserData(data);

                const repoRes = await axios.get(`${apiUrl}/api/github/user/${username}/repos`);
                setRepos(repoRes.data);

            } catch(e){
                alert("GitHub user not found!");
            }
        }

  return (
    <div className="p-6 bg-gray-800 text-white">
    <button onClick={fetchUserProfile} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
        Load Profile
    </button>

    {userData && (
        <div className="mt-4">
            <img src={userData.avatar_url} alt="Profile" className="w-24 h-24 rounded-full" />
            <h2 className="text-xl font-bold">{userData.username}</h2>
            <p>Followers: {userData.followers} | Following: {userData.following}</p>
        </div>
    )}

    {repos.map((repo) => (
        <div key={repo.id} className="bg-gray-700 p-3 mt-3 rounded">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
            </a>
        </div>
    ))}
</div>
  )
}

export default UserProfile
