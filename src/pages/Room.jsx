import VideoStreaming from "../compenents/VideoStreaming";
import ChatComponent from "../compenents/Chat";

const RoomPage = () => {
    return (
      <div className="relative h-screen overflow-hidden bg-gray-900">
        {/* Static Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900"></div>
  
        <div className="relative flex flex-col h-full">
          {/* Search Bar */}
          <div className="p-4 bg-gray-800/90 shadow-md z-20">
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                className="flex-1 rounded-md bg-gray-700 text-white placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter a video URL or search for a video"
              />
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300">
                Add Video
              </button>
            </div>
          </div>
  
          {/* Video and Chat Layout */}
          <div className="relative flex flex-grow">
            {/* Video Section */}
            <div className="flex-1 p-4">
              <VideoStreaming />
            </div>
  
            {/* Chat Section */}
            <div className="w-1/3 p-4 bg-gray-800/80">
              <ChatComponent />
            </div>
          </div>
        </div>
      </div>
    );
};
  

export default RoomPage;
