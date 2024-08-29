// Importa express y los controladores de encuestas
import express from 'express';
import {
    getAllPersonal,
    getIdPersonal,
    searchPersonal,
    createPersonal,
    updatePersonal,
    searchPersonalId
} from '../controllers/PersonalController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para instalaciones
router.get('/search', searchPersonal);
router.get('/user/:user_id', searchPersonalId);
router.get('/', getAllPersonal); 
router.get('/:id', getIdPersonal);
router.post('/', createPersonal); 
router.put('/:id', updatePersonal); 

// Exporta el enrutador
export default router;
