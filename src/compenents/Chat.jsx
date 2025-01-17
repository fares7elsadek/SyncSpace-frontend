const ChatComponent = () => {
    const messages = [
      {
        id: 1,
        user: "Alice",
        avatar: "https://i.pravatar.cc/40?img=10",
        time: "10:45 AM",
        text: "Hey there! Excited for the movie?",
      },
      {
        id: 2,
        user: "Bob",
        avatar: "https://i.pravatar.cc/40?img=32",
        time: "10:46 AM",
        text: "Absolutely! Can't wait to watch it with everyone!",
      },
    ];
  
    return (
      <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-md">
        <header className="bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
          <h2 className="text-lg font-semibold text-white">Live Chat</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start space-x-3 group"
            >
              <img
                src={msg.avatar}
                alt={`${msg.user} avatar`}
                className="w-10 h-10 rounded-full shadow-md"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-bold text-gray-100 group-hover:text-blue-400">
                    {msg.user}
                  </p>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-gray-300 group-hover:text-blue-200">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-600">
          <form className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ChatComponent;
  