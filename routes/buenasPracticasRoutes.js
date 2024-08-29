// Importa express y los controladores de encuestas
import express from 'express';
import {
  getAllBuenaPractica,
  getIdBuenaPractica,
  createBuenaPractica,
  updateBuenaPractica,
  searchBuenaPractica,
  searchBuenaPracticaId
} from '../controllers/BuenaPracticaController.js';

// Crea un enrutador de express
const router = express.Router();

// Definir rutas para buenas prácticas
router.get('/search', searchBuenaPractica);
router.get('/user/:user_id', searchBuenaPracticaId);
router.get('/', getAllBuenaPractica);
router.get('/:id', getIdBuenaPractica);
router.post('/', createBuenaPractica);
router.put('/:id', updateBuenaPractica);

// Exporta el enrutador
export default router;
