import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import Message from "./Message";
import { useChat } from "../context/ChatContext";

function Conversation() {
  const { conversationId } = useParams();
  const {
    messages,
    fetchMessages,
    aiLoading,
    loadingMessages,
    sendMessage,
    setMessages,
  } = useChat();

  // Clear + Fetch messages when conversationId changes
  useEffect(() => {
    if (conversationId) {
      setMessages([]);
      fetchMessages(conversationId);
    }
  }, [conversationId, fetchMessages, setMessages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-screen">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {loadingMessages ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet.</p>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
            {/* {aiLoading && (
              <p className="text-gray-400 italic">
                🤖 Assistant is thinking...
              </p>
            )} */}
            {aiLoading && (
              <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-xl shadow-md max-w-xs animate-fadeIn">
                {/* Spinning AI icon */}
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-200 italic text-sm">
                  Assistant is thinking...
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Chat input */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <ChatBox onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Conversation;
