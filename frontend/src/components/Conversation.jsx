import ChatBox from "./ChatBox";
import Message from "./Message";

function Conversation({ chat }) {
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col">
      {/* Messages area (scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      {/* Chat input always at bottom */}
      <div className="sticky bottom-0 bg-gray-900 p-3 border-t border-gray-800">
        <ChatBox />
      </div>
    </div>
  );
}

export default Conversation;
