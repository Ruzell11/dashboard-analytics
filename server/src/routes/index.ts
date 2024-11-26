import express from 'express';
import { getActivityMetrics, getAnalyticsData, getSalesMetrics } from '../controller/analyticsController';

const router = express.Router();

router.get('/sales', getSalesMetrics);
router.get('/activity', getActivityMetrics);
router.get('/analytics', getAnalyticsData);

export default router;