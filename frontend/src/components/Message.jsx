import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

      {/* Message bubble with markdown */}
      <div
        className={`max-w-xl p-4 rounded-lg prose prose-invert ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
