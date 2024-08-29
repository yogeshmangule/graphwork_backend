// Importa express y los controladores de encuestas
import express from 'express';
import {
    getAllInstalaciones,
    getIdInstalaciones,
    createInstalacion,
    updateInstalacion,
    searchInstalacion,
    searchInstalacionId
} from '../controllers/InstalacionesController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para encuestas
router.get('/search', searchInstalacion);
router.get('/user/:user_id', searchInstalacionId);
router.get('/', getAllInstalaciones);
router.get('/:id', getIdInstalaciones);
router.post('/', createInstalacion);
router.put('/:id', updateInstalacion);


// Exporta el enrutador
export default router;