const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/conversations", chatController.getConversations);
router.post("/conversations", chatController.createConversation);
router.delete("/conversations/:id", chatController.deleteConversation);
router.get("/conversations/:id/messages", chatController.getMessages);
router.post("/conversations/:id/messages", chatController.sendMessage);

module.exports = router;
