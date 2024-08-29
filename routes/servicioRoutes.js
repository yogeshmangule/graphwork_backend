// Importa express y los controladores de servicio
import express from 'express';
import {
    getAllServicios,
    getServicioById,
    createServicio,
    updateServicio,
    searchServicio,
    searchServicioId
} from '../controllers/ServicioController.js';

// Crea un enrutador express
const router = express.Router();

// Define rutas para las encuestas de servicio
router.get('/search', searchServicio);
router.get('/user/:user_id', searchServicioId);
router.get('/', getAllServicios);
router.get('/:id', getServicioById);
router.post('/', createServicio);
router.put('/:id', updateServicio);

// Exporta el enrutador
export default router;
