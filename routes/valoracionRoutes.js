// Importa express y los controladores de valoraciones
import express from 'express';
import {
  getAllValoraciones,
  getIdValoracion,
  createValoracion,
  updateValoracion,
  searchValoracion,
  searchValoracionId
} from '../controllers/ValoracionController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para valoraciones
router.get('/search', searchValoracion);
router.get('/user/:user_id', searchValoracionId);
router.get('/', getAllValoraciones);
router.get('/:id', getIdValoracion);
router.post('/', createValoracion);
router.put('/:id', updateValoracion);

// Exporta el enrutador
export default router;
