// Import express and the spectacle controllers
import express from 'express';
import {
  getAllEspectaculos,
  getEspectaculoById,
  createEspectaculo,
  updateEspectaculo,
  searchEspectaculo,
  searchEspectaculoId
} from '../controllers/EspectaculoController.js';

// Create an express router
const router = express.Router();

// Define routes for spectacle surveys
router.get('/search', searchEspectaculo);
router.get('/user/:user_id', searchEspectaculoId);
router.get('/', getAllEspectaculos);
router.get('/:id', getEspectaculoById);
router.post('/', createEspectaculo);
router.put('/:id', updateEspectaculo);

// Export the router
export default router;
