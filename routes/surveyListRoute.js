// Importa express y los controladores de usuarios
import express from 'express';
import {
    getAllData,
} from '../controllers/surveyListController.js';
// Crea un enrutador de express
const router = express.Router();

// Definir rutas para usuarios
router.get('/', getAllData);

// Exporta el enrutador
export default router;
