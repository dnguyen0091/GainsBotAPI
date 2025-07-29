import dotenv from 'dotenv';

dotenv.config();

export const getChatHistory = async (req, res) => {
    try
    {

    }
    catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const saveChatHistory = async (req, res) => {
    try
    {

    }
    catch (error) {
        console.error('Error saving chat history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}