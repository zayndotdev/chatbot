import { User, Bot } from "lucide-react";

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 max-w-4xl mx-auto px-4 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-blue-500" : "bg-green-500"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message */}
      <div
        className={`max-w-xl p-4 rounded-lg ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default Message;
