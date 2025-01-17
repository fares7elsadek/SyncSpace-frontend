const VideoStreaming = () => {
    return (
      <div className="flex items-center justify-center bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <video
          className="w-full h-full max-h-[calc(100vh-4rem)] rounded-lg"
          autoPlay
          loop
          muted
          controls
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoStreaming;
  