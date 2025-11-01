import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import agricultorRoutes from './routes/agricultorRoutes.js'

// Configura dotenv para cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
conectarDB(); 

// Crear la instancia de express
const app = express();

// Habilitar CORS (para que tu frontend se conecte)
app.use(cors());

// Habilitar lectura de JSON
app.use(express.json());

// Definir el puerto
const PORT = process.env.PORT || 4000;
app.use('/api/agricultores', agricultorRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! El backend del Agricultor está funcionando.');
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});