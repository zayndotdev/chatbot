import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, Plus } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  // Load conversations from backend when Sidebar mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/chat/conversations")
      .then((res) => res.json())
      .then((data) => {
        // ✅ backend returns { success, data }
        if (data.success && Array.isArray(data.data)) {
          setChats(data.data);
        } else {
          setChats([]);
        }
      })
      .catch((err) => console.error("Error fetching chats:", err));
  }, []);

  // Handle creating new chat
  const handleNewChat = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/chat/conversations", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      const result = await res.json();
      if (result.success && result.data) {
        setChats((prev) => [result.data, ...prev]); // put new chat on top
        navigate(`/chat/${result.data._id}`);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg transition-colors w-full text-left"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Dynamic Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat) => (
            <button
              key={chat._id}
              onClick={() => navigate(`/chat/${chat._id}`)}
              className={`flex items-center gap-3 p-3 border-b border-gray-700 transition-colors w-full text-left ${
                location.pathname === `/chat/${chat._id}`
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <MessageSquare size={16} />
              <span className="truncate">{chat.title || "Untitled Chat"}</span>
            </button>
          ))
        ) : (
          <p className="text-gray-400 p-3">No conversations yet</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
