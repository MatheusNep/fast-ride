import express from 'express';
import { estimateRide, saveRide } from './controllers/rideController';

const router = express.Router();

router.post('/ride/estimate', estimateRide);
router.post('/ride/confirm', saveRide);

export default router;
