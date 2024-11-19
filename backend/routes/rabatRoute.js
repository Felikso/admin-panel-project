import express from 'express';
import { verifyRabat, setRabat } from '../controllers/rabatController.js';

const rabatRoute = express.Router();

rabatRoute.post('/set', setRabat);
rabatRoute.post('/verify', verifyRabat);

export default rabatRoute;
