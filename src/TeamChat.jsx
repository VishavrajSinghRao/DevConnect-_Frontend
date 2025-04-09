import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const apiUrl = "https://devconnect-backend-2iqt.onrender.com";

const socket = io(`${apiUrl}`);

const TeamChat = ({ teamId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { teamId });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [teamId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const messageData = {
      teamId,
      message: input,
      user: {
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl
      }
    };
    socket.emit("sendMessage", messageData);
    setInput("");
  };

  return (
    <div className="p-4 bg-gray-900 rounded-md mt-4">
      <h2 className="text-xl font-bold text-cyan-300 mb-3">💬 Team Chat</h2>
      <div className="h-60 overflow-y-scroll border border-cyan-500 p-3 rounded-md mb-3 bg-gray-800">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex items-center gap-2">
              <img src={msg.user.avatarUrl} className="w-6 h-6 rounded-full" />
              <span className="font-medium text-cyan-400">{msg.user.username}</span>
            </div>
            <p className="ml-8 text-white">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-800 text-white rounded-md"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-500 px-4 py-2 rounded-md text-white hover:bg-cyan-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TeamChat;
