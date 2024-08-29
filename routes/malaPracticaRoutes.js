// Importa express y los controladores de encuestas
import express from 'express';
import {
    getAllMalaPractica,
    getIdMalaPractica,
    createMalaPractica,
    updateMalaPractica,
    searchMalaPractica,
    searchMalaPracticaId
} from '../controllers/MalaPracticaController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para encuestas de mala práctica
router.get('/search', searchMalaPractica);
router.get('/user/:user_id', searchMalaPracticaId);
router.get('/', getAllMalaPractica);
router.get('/:id', getIdMalaPractica);
router.post('/', createMalaPractica);
router.put('/:id', updateMalaPractica);

// Exporta el enrutador
export default router;
