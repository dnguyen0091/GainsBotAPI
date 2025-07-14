import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.use(express.json());
    app.use(cors({
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    }));
    

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    app.use(cookieParser());
    
    app.use('/api/ai', aiRoutes);
    app.use('/api/auth', authRoutes);

    app.get('/', (req, res) => {
      res.send('Welcome to the GainsBot API');
    });
    
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

startServer();