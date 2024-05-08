import express from 'express';
import gameRoutes from './routes/GameRoutes';
import slotMachineRoutes from './routes/SlotMachineRoutes';

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/games', gameRoutes); // User routes
app.use('/slot-machine', slotMachineRoutes); // User routes

export default app;
