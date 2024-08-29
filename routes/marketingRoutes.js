// Import express and the marketing controllers
import express from 'express';
import {
  getAllMarketing,
  getMarketingById,
  createMarketing,
  updateMarketing,
  searchMarketing,
  searchMarketingId
} from '../controllers/MarketingController.js';

// Create an express router
const router = express.Router();

// Define routes for marketing surveys
router.get('/search', searchMarketing);
router.get('/user/:user_id', searchMarketingId);
router.get('/', getAllMarketing);
router.get('/:id', getMarketingById);
router.post('/', createMarketing);
router.put('/:id', updateMarketing);

// Export the router
export default router;
