import express from 'express';
import {
    getAllPrecios,
    getIdPrecio,
    createPrecio,
    updatePrecio,
    searchPrecio,
    searchPrecioId
} from '../controllers/PrecioController.js';

const router = express.Router();

// Define routes for price surveys
router.get('/search', searchPrecio);
router.get('/user/:user_id', searchPrecioId);
router.get('/', getAllPrecios);
router.get('/:id', getIdPrecio);
router.post('/', createPrecio);
router.put('/:id', updatePrecio);

export default router;
