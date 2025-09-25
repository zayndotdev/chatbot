/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  //   Create a new conversation
  const createConversation = async (title = "New Chat") => {
    try {
      const res = await fetch("http://localhost:3000/api/chat/conversations", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        setConversations((prev) => [result.data, ...prev]);
        setActiveConversationId(result.data._id);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // ChatContext.jsx
  const fetchConversations = useCallback(async () => {
    try {
      setLoadingConversations(true);
      const res = await fetch("http://localhost:3000/api/chat/conversations");
      const data = await res.json();
      if (data.success) setConversations(data.data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  // Fetch messages for a specific conversation
  const fetchMessages = useCallback(async (conversationId) => {
    try {
      setLoadingMessages(true);
      setActiveConversationId(conversationId);
      const res = await fetch(
        `http://localhost:3000/api/chat/conversations/${conversationId}/messages`
      );
      const data = await res.json();
      if (data.success) setMessages(data.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Send a message
  const sendMessage = async (text) => {
    if (!activeConversationId) return;
    const tempMessage = {
      _id: Date.now().toString(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, tempMessage]);
    setAiLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/chat/conversations/${activeConversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.data]);
        fetchConversations();
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        messages,
        loadingConversations,
        loadingMessages,
        aiLoading,
        fetchConversations,
        fetchMessages,
        setActiveConversationId,
        sendMessage,
        createConversation,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
