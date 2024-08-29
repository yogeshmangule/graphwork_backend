// Importa express y los controladores de encuestas
import express from 'express';
import {
    getAllAmbiente,
    getIdAmbiente,
    createAmbiente,
    updateAmbiente,
    searchAmbiente,
    searchAmbienteId
} from '../controllers/AmbienteController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para encuestas
router.get('/search', searchAmbiente);
router.get('/user/:user_id', searchAmbienteId);
router.get('/', getAllAmbiente);
router.get('/:id', getIdAmbiente);
router.post('/', createAmbiente);
router.put('/:id', updateAmbiente);


// Exporta el enrutador
export default router;