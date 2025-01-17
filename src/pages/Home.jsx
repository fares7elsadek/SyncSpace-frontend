import { useState } from "react";

const Home = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Movie Night", members: 5, createdAt: "2025-01-10" },
    { id: 2, name: "Study Group", members: 8, createdAt: "2025-01-15" },
    { id: 3, name: "Gaming Session", members: 10, createdAt: "2025-01-12" },
  ]);

  const handleCreateRoom = () => {
    alert("Create Room functionality here.");
  };

  const handleJoinRoom = () => {
    alert("Join Room functionality here.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse bg-blue-900/30 rounded-full absolute w-[500px] h-[500px] blur-3xl top-[10%] left-[5%]"></div>
        <div className="animate-ping bg-green-700/20 rounded-full absolute w-[300px] h-[300px] blur-3xl top-[50%] left-[70%]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 relative">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Main Section */}
          <div className="lg:w-3/5 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to <span className="text-blue-500">SyncSpace</span>
            </h1>
            <p className="text-lg text-gray-300">
              Stream your favorite content together with your friends in real time. Create, join, and explore rooms designed for collaborative fun!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleCreateRoom}
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-500 transition duration-300"
              >
                Create Room
              </button>
              <button
                onClick={handleJoinRoom}
                className="rounded-md bg-green-600 px-6 py-3 text-lg font-medium text-white hover:bg-green-500 transition duration-300"
              >
                Join Room
              </button>
            </div>

            {/* Decorative Image */}
            <div className="mt-8">
              <img
                src="https://cdn.prod.website-files.com/5fac161927bf86485ba43fd0/64705ea9d8e3a20620a40d3f_Blog-Cover_2022_01_Best-Live-Streaming-Apps-_-Platforms-For-Any-Device.png"
                alt="Streaming"
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Rooms List */}
          <div className="lg:w-2/5 bg-gray-800/70 rounded-lg shadow-md p-4 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Your Joined Rooms
            </h2>
            {rooms.length === 0 ? (
              <p className="text-gray-400 text-center">
                No rooms joined yet. Start exploring!
              </p>
            ) : (
              <ul className="space-y-4 overflow-auto h-[400px] pr-2">
                {rooms.map((room) => (
                  <li
                    key={room.id}
                    className="rounded-lg bg-gray-700 hover:bg-gray-600 px-4 py-3 flex items-center justify-between shadow-lg transition duration-300"
                  >
                    <div>
                      <h3 className="text-lg font-medium">{room.name}</h3>
                      <p className="text-sm text-gray-400">
                        Members: {room.members} | Created: {room.createdAt}
                      </p>
                    </div>
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-sm font-bold text-white">
                      {room.members}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
