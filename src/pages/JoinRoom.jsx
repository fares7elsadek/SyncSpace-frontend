import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";


const API_URL = "https://syncspace.runasp.net/api";
const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const handleJoinRoom = async () => {
    if (roomId.trim() === "") {
      alert("Room ID cannot be empty!");
      return;
    }

    try{
        await axiosInstance.post(`${API_URL}/room/${roomId}/join`,{connectionId:"fares"}).then(response =>{
            toast.success("User joined successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "toast-container",
                bodyClassName: "toast-body",
                progressClassName: "toast-progress",
            });
            setTimeout(() => {
                navigate(`/room/${roomId}`);
            }, 3000);
        }).catch(error =>{
            toast.error(error.response.data.errors[0] ? error.response.data.errors[0] : "Something wrong was happened", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "toast-container",
                bodyClassName: "toast-body",
                progressClassName: "toast-progress",
              });
        });
    }catch(error){
        toast.error(error.response.data.errors[0] ? error.response.data.errors[0] : "Something wrong was happened", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  className: "toast-container",
                  bodyClassName: "toast-body",
                  progressClassName: "toast-progress",
                });
    }
   
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Join a Room
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID"
            className="w-full px-4 py-3 rounded-md bg-gray-900 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
          <button
            onClick={handleJoinRoom}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomPage;
