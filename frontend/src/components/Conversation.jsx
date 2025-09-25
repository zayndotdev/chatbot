import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import Message from "./Message";

function Conversation() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false); // 👈 AI typing state

  // ✅ Fetch messages when conversationId changes
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/chat/conversations/${conversationId}/messages`
        );
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    }
    if (conversationId) fetchMessages();
  }, [conversationId]);

  // ✅ Handle sending a new message
  const handleSendMessage = async (text) => {
    // Show the user’s message immediately (optimistic update)
    const tempMessage = {
      _id: Date.now().toString(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, tempMessage]);
    setAiLoading(true); // 👈 show typing indicator

    try {
      const res = await fetch(
        `http://localhost:3000/api/chat/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();
      if (data.success) {
        // Append assistant’s reply
        setMessages((prev) => [...prev, data.data]);
      }
    } catch (error) {
      console.error("Send message failed:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-screen">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet.</p>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
            {aiLoading && (
              <p className="text-gray-400 italic">
                🤖 Assistant is thinking...
              </p>
            )}
          </>
        )}
      </div>

      {/* Chat input */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <ChatBox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Conversation;
