import express from 'express';
import { 
  registrar, 
  confirmarCuenta, 
  autenticar, 
  perfil 
} from '../controllers/agricultorController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Endpoints ---

// Área Pública
router.post('/', registrar);                      // (Ya lo tenías)
router.get('/confirmar/:token', confirmarCuenta); // <-- (Paso 2.3) Ruta de confirmación
router.post('/login', autenticar);                // <-- (Paso 1.3) Ruta de Login

// Área Privada (Requiere autenticación)
router.get('/perfil', checkAuth, perfil);         // <-- (Paso 3.3) Ruta de Perfil

export default router;