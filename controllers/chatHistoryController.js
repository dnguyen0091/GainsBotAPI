import dotenv from 'dotenv';

dotenv.config();

export const getChatHistory = async (req, res) => {
    try {
        // Get parameters from request
        const { userId } = req.params;

        // Validate input by finding user by ID
        const user = await User.findOne({ _id: userId }).populate('history').lean();

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        
        res.status(200).json(user.history); // Return user's chat history
    }
    catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const saveChatHistory = async (req, res) => {
    try {
        // Get parameters from request
        const { userId, chatHistory } = req.params;

        // Validate input by finding user by ID
        const user = await User.findOne({ _id: userId }).populate('history').lean();

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.history.push(chatHistory); //Push new chat history to user's history array
        await user.save(); // Save updated user document
        res.status(200).json({ message: 'Chat history saved successfully' });
    }
    catch (error) {
        console.error('Error saving chat history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}