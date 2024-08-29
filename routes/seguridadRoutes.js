// Import express and the security controllers
import express from 'express';
import {
    getAllSeguridad,
    getIdSeguridad,
    createSeguridad,
    updateSeguridad,
    searchSeguridad,
    searchSeguridadId
} from '../controllers/SeguridadController.js';

// Create an express router
const router = express.Router();

// Define routes for security surveys
router.get('/search', searchSeguridad);
router.get('/user/:user_id', searchSeguridadId);
router.get('/', getAllSeguridad);
router.get('/:id', getIdSeguridad);
router.post('/', createSeguridad);
router.put('/:id', updateSeguridad);

// Export the router
export default router;
