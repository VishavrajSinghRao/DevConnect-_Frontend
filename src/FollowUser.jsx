import React, { useState } from 'react'
import axios from 'axios'

const FollowUser = ({userId, targetUserId,isFollowing}) => {
   const [following , setFollowing] = useState(isFollowing);

   const toggleFollow = async () => {
        try{
            await axios.post("http://localhost:5000/api/follow", { userId, targetUserId });
            setFollowing(!following);
        } catch(e){
            alert("Error following user");
        }
   }

  return (
    <div>
         <button 
            onClick={toggleFollow} 
            className={`px-4 py-2 rounded ${following ? "bg-red-600" : "bg-green-600"} hover:opacity-80`}
        >
            {following ? "Unfollow" : "Follow"}
        </button>
      
    </div>
  )
}

export default FollowUser
