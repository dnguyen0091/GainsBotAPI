import express from 'express';
import { getChatHistory, saveChatHistory } from '../controllers/chatHistoryController.js';

const router = express.Router();

router.get('/getHistory', getChatHistory);
router.post('/saveHistory', saveChatHistory);

export default router;
