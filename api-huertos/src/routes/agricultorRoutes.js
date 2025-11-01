import express from 'express';
import { registrar } from '../controllers/agricultorController.js';

// Configura el enrutador de Express
const router = express.Router();

// --- Definición de Endpoints ---

// Cuando se haga un POST a la ruta raíz ('/'), se ejecutará la función 'registrar'
// Esta ruta raíz será luego prefijada con '/api/agricultores' en index.js

// Endpoint para el registro
router.post('/', registrar); 

// (Aquí añadiremos luego las otras rutas: /login, /confirmar, /perfil, etc.)


// Exporta el router para usarlo en el archivo principal
export default router;