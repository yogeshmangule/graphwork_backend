// Import express and the entorno controllers
import express from 'express';
import {
    getAllEntorno,
    getIdEntorno,
    createEntorno,
    updateEntorno,
    searchEntorno,
    searchEntornoId
} from '../controllers/EntornoController.js';

// Create an express router
const router = express.Router();

// Define routes for entorno surveys
router.get('/search', searchEntorno);
router.get('/user/:user_id', searchEntornoId);
router.get('/', getAllEntorno);
router.get('/:id', getIdEntorno);
router.post('/', createEntorno);
router.put('/:id', updateEntorno);

// Export the router
export default router;
