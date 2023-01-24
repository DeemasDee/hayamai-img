import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import hayamaiRoutes from './routes/hayamaiRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/hayamai', hayamaiRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from HayamAI!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();