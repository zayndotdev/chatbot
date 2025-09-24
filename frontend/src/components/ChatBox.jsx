import { useState } from "react";
import { Send } from "lucide-react";

function ChatBox({ conversationId, onNewMessage }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    console.log(input);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/chat/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: input }),
        }
      );

      const newMessage = await response.json();
      onNewMessage(newMessage);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex gap-2 max-w-3xl mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white p-3 rounded-lg resize-none"
          rows="1"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
      {loading && (
        <p className="text-center text-gray-400 mt-2">AI is typing...</p>
      )}
    </div>
  );
}

export default ChatBox;
