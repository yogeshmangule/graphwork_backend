// Importa express y los controladores de encuestas
import express from 'express';
import {
    getAllHorarios,
    getIdHorario,
    createHorario,
    updateHorario,
    searchHorario,
    searchHorarioId,
    checkEncuestaId
} from '../controllers/HorarioController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para encuestas
router.get('/search', searchHorario);
router.get('/user/:user_id', searchHorarioId);
router.get('/enc/:encuesta_id', checkEncuestaId);
router.get('/', getAllHorarios);
router.get('/:id', getIdHorario);
router.post('/', createHorario);
router.put('/:id', updateHorario);

// Exporta el enrutador
export default router;