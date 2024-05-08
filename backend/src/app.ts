import express from 'express';
import gameRoutes from './routes/gameRoutes';

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/games', gameRoutes); // User routes

export default app; 