const VideoStreaming = ({playerRef,url,}) => {
  return (
    <div className="flex items-center justify-center bg-black rounded-lg shadow-lg overflow-hidden h-full">
      <video
        className="w-full h-auto max-h-full rounded-md"
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
  