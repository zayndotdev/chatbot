import { useState } from "react";
import { Send } from "lucide-react";

function ChatBox({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText(""); // clear input
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-gray-800 border-gray-700 px-4">
      <div className="flex items-center max-w-4xl mx-auto w-full">
        <textarea
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white px-5 py-3 rounded-s-full resize-none focus:outline-none shadow-sm"
          rows="1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center border-2 border-blue-600 hover:border-blue-700 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-r-full transition-colors duration-200 shadow-sm cursor-pointer"
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
