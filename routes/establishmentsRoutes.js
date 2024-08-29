// Import express and the spectacle controllers
import express from 'express';
import multer from 'multer';
import {
    getAllEstablishments,
    getEstablishmentByID,
    updateEstablishment,
    disableEstablishment,
    deleteEstablishment,
    createEstablishment

} from '../controllers/EstablishmentsController.js';

// Create an express router
const router = express.Router();
// Set up multer for handling image uploads
const storage = multer.memoryStorage(); // Store the files in memory as buffer
const upload = multer({ storage });

// Define routes for spectacle surveys
// router.get('/search', searchEspectaculo);
// router.get('/user/:user_id', searchEspectaculoId);
router.post('/create', upload.array('pictures'), createEstablishment);
router.post('/', getAllEstablishments);
router.post('/:id', getEstablishmentByID);
// router.delete('/:id', deleteEstablishment);
// router.put('/:id', updateEstablishment);
router.put('/update', upload.array('pictures'), updateEstablishment);


// Export the router
export default router;
