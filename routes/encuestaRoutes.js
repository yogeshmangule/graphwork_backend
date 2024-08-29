// Importa express y los controladores de encuestas
import express from 'express';
import {
    getAllEncuesta,
    getIdEncuesta,
    createEncuesta,
    updateEncuesta,
    searchEncuestas,
    searchEncuestasId
} from '../controllers/EncuestaController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para encuestas
router.get('/search', searchEncuestas);
router.get('/user/:user_id', searchEncuestasId);
router.get('/', getAllEncuesta);
router.get('/:id', getIdEncuesta);
router.post('/', createEncuesta);
router.put('/:id', updateEncuesta);


// Exporta el enrutador
export default router;
