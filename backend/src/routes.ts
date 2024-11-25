import express from 'express';
import { estimateRide } from './controllers/rideController';

const router = express.Router();

router.post('/ride/estimate', estimateRide);

export default router;
