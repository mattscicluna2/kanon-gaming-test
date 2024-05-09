import express from 'express';
import gameRoutes from './routes/GameRoutes';
import slotMachineRoutes from './routes/SlotMachineRoutes';

import cors from 'cors';

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());
app.use('/games', gameRoutes); // User routes
app.use('/slot-machine', slotMachineRoutes); // User routes

export default app;
