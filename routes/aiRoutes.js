import express from 'express';
import { chatBotController } from '../controllers/chatBotController.js';


const router = express.Router();

router.post('/chat', chatBotController);

export default router;