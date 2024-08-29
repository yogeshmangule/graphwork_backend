// Importa express y los controladores de usuarios
import express from 'express';
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login, 
    searchUsers
} from '../controllers/UserController.js';
import { hashPasswordMiddleware } from '../middleware/bcryptMiddleware.js';

// Crea un enrutador de express
const router = express.Router();


// Definir ruta para búsqueda de usuarios
router.get('/search', searchUsers);
// Definir rutas para usuarios
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', hashPasswordMiddleware, createUser);
router.put('/:id',hashPasswordMiddleware, updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);

// Exporta el enrutador
export default router;
