require("dotenv").config();

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Utility: Standardized error handler
function handleError(res, message = "Server error", status = 500) {
  return res.status(status).json({ success: false, error: message });
}

// 🗂️ Get all conversations
async function getConversations(req, res) {
  try {
    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    return res.json({ success: true, data: conversations });
  } catch {
    return handleError(res);
  }
}

// 🗂️ Create a new conversation
async function createConversation(req, res) {
  try {
    const conversation = await Conversation.create({});
    return res.json({ success: true, data: conversation });
  } catch {
    return handleError(res);
  }
}

// 💬 Get all messages in a conversation
async function getMessages(req, res) {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort(
      { createdAt: 1 }
    );
    return res.json({ success: true, data: messages });
  } catch {
    return handleError(res);
  }
}

// 💬 Send user message + get AI response
async function sendMessage(req, res) {
  try {
    const { text } = req.body;
    const conversationId = req.params.id;

    if (!text?.trim()) {
      return handleError(res, "Message text is required", 400);
    }

    // 1️⃣ Save user message
    await Message.create({ conversationId, role: "user", text });

    // 2️⃣ If conversation title is still default, update it to first user input
    const conversation = await Conversation.findById(conversationId);
    if (conversation && conversation.title === "New Chat") {
      conversation.title = text.substring(0, 50); // limit length
      await conversation.save();
    }

    // 3️⃣ Build chat history for OpenAI
    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });
    const chatHistory = messages.map(({ role, text }) => ({
      role,
      content: text,
    }));

    // 4️⃣ Get AI response
    const { choices } = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatHistory,
      max_tokens: 500,
    });

    const aiResponse =
      choices[0]?.message?.content || "I couldn’t generate a response.";

    // 5️⃣ Save AI response
    const assistantMessage = await Message.create({
      conversationId,
      role: "assistant",
      text: aiResponse,
    });

    return res.json({ success: true, data: assistantMessage });
  } catch (error) {
    console.error("Chatbot Error:", error);
    return handleError(res, "Failed to get AI response");
  }
}
// 🗂️ Get a specific conversation by ID
async function getConversationById(req, res) {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return handleError(res, "Conversation not found", 404);
    }

    return res.json({ success: true, data: conversation });
  } catch (error) {
    console.error("Get Conversation Error:", error);
    return handleError(res);
  }
}

// 🗑️ Delete a conversation + all its messages
async function deleteConversation(req, res) {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ conversationId: req.params.id });
    return res.json({ success: true, message: "Conversation deleted" });
  } catch {
    return handleError(res);
  }
}

module.exports = {
  getConversations,
  getConversationById,
  createConversation,
  getMessages,
  sendMessage,
  deleteConversation,
};
