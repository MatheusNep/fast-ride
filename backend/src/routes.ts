import express from 'express';
import { estimateRide, getRides, saveRide } from './controllers/rideController';
import { getDrivers } from './controllers/driversController';

const router = express.Router();

router.post('/ride/estimate', estimateRide);
router.post('/ride/confirm', saveRide);
router.get('/ride/:customer_id', getRides);
router.get('/drivers', getDrivers);


export default router;
