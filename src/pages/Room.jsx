import ReactPlayer from "react-player";
import ChatComponent from '../compenents/Chat';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const API_URL = "https://syncspace.runasp.net/streaminghub";
const API_URL_Chat = "https://syncspace.runasp.net/api";
const AVATAR_URL = "https://syncspace.runasp.net/favatars";
const RoomPage = () => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [connection, setConnection] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { roomId } = useParams();

  // Initialize SignalR connection
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(API_URL)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to bottom on load
    }
  }, [newMessage,messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL_Chat}/chat/${roomId}`);
        if (response.data.isSuccess) {
          setMessages(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [roomId]);

  // Handle SignalR connection and register events
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => connection.invoke("JoinRoom", roomId))
        .catch((err) => console.error("Connection failed: ", err));

      // Handle incoming events
      const handleSyncVideo = (currentTime, isPaused) => {
        const playerTime = playerRef.current.getCurrentTime();
        const drift = Math.abs(playerTime - currentTime);

        if (drift > 1) {
          playerRef.current.seekTo(currentTime, "seconds");
        }

        setIsPlaying(!isPaused);
      };

      const handleUpdateVideo = (currentTime, isPaused) => {
        const playerTime = playerRef.current.getCurrentTime();
        const drift = Math.abs(playerTime - currentTime);

        if (drift > 1) {
          playerRef.current.seekTo(currentTime, "seconds");
        }

        setIsPlaying(!isPaused);
      };

      const handleStreamStarted = (streamUrl) => {
        setVideoUrl(streamUrl);
        setIsPlaying(true);
      };


      const handleReceiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      connection.on("SyncVideo", handleSyncVideo);
      connection.on("UpdateVideo", handleUpdateVideo);
      connection.on("StreamStarted", handleStreamStarted);
      connection.on("ReceiveMessage", handleReceiveMessage);
      return () => {
        connection.off("SyncVideo", handleSyncVideo);
        connection.off("UpdateVideo", handleUpdateVideo);
        connection.off("StreamStarted", handleStreamStarted);
        connection.off("ReceiveMessage", handleReceiveMessage);
      };
    }
  }, [connection, roomId]);

  // Handle play/pause state changes
  const handleStateChange = (isPaused) => {
    const currentTime = playerRef.current.getCurrentTime();
    connection
      .invoke("UpdateVideoState", roomId, currentTime, isPaused)
      .catch((err) => console.error("Failed to update state:", err));
    setIsPlaying(!isPaused);
  };

  // Handle seek events
  const handleSeek = (seconds) => {
    connection
      .invoke("UpdateVideoState", roomId, seconds, !isPlaying)
      .catch((err) => console.error("Failed to update seek state:", err));
  };

  // Start streaming a video
  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      console.error("Video URL is empty. Please provide a valid URL.");
      return;
    }
    connection
      .invoke("StartStream", roomId, videoUrl)
      .catch((err) => console.error("Failed to start stream: ", err));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      console.error("Message cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${API_URL_Chat}/chat`, {
        content: newMessage,
        roomId,
      });
      if (response.data.isSuccess) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900"></div>
      <div className="relative flex flex-col h-full">
        <div className="p-4 bg-gray-800/90 shadow-md z-20">
          <div className="flex items-center justify-between gap-4">
            <input
              onChange={(e) => setVideoUrl(e.target.value)}
              type="text"
              className="flex-1 rounded-md bg-gray-700 text-white placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter a video URL or search for a video"
            />
            <button
              onClick={handleAddVideo}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Add Video
            </button>
          </div>
        </div>

        <div className="relative flex flex-grow">
          <div className="flex-1 p-4">
            <div className="flex items-center justify-center bg-black rounded-lg shadow-lg overflow-hidden h-full">
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing={isPlaying}
                onPlay={() => handleStateChange(false)}
                onPause={() => handleStateChange(true)}
                onSeek={(seconds) => handleSeek(seconds)}
                controls
                width="100%"
                height="100%"
              />
            </div>
          </div>

          <div className="w-1/3 p-4 bg-gray-800/80">
          <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg">
      <header className="bg-gray-700 p-4 rounded-t-lg border-b border-gray-600 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Live Chat</h2>
      </header>
      <div ref={containerRef} className="flex-1 overflow-scroll max-h-[450px] p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {messages.map((msg) => (
          <div key={msg.messageId} className="flex items-start space-x-3">
            <img
              src={`${AVATAR_URL}/${msg.user.avatar.split('\\')[6]}`}
              alt={`${msg.user.userName} avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-gray-100">{msg.user.userName}</p>
              <p className="text-xs text-gray-500">{new Date(msg.sentAt).toLocaleTimeString()}</p>
              <p className="text-sm text-gray-300 bg-gray-700 p-2 rounded-md max-w-xs">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-600 bg-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
