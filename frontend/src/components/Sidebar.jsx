import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Plus } from "lucide-react";
import { useChat } from "../context/ChatContext";

function Sidebar() {
  const navigate = useNavigate();
  const {
    conversations,
    fetchConversations,
    createConversation,
    activeConversationId,
    setActiveConversationId,
  } = useChat();

  // Load conversations when Sidebar mounts
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleNewChat = async () => {
    try {
      const newConversation = await createConversation(); // get the created conversation
      if (newConversation?._id) {
        setActiveConversationId(newConversation._id); // update state
        navigate(`/chat/${newConversation._id}`); // navigate immediately
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full cursor-pointer"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Dynamic Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          conversations.map((chat) => (
            <button
              key={chat._id}
              onClick={() => {
                setActiveConversationId(chat._id);
                navigate(`/chat/${chat._id}`);
              }}
              className={`flex items-center gap-3 p-3 border-b border-gray-700 transition-colors w-full text-left cursor-pointer ${
                activeConversationId === chat._id
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
