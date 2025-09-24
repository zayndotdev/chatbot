import { User, Bot } from "lucide-react";

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 max-w-3xl mx-auto ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message */}
      <div
        className={`p-3 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default Message;
