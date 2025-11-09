import Agricultor from '../models/Agricultor.js';
// Importamos los helpers que creamos
import { generarId, generarJWT } from '../helpers/generarToken.js';

const registrar = async (req, res) => {
  // 1. Obtener los datos (esto ya lo tenías)
  const { nombre, email, password } = req.body;

  // 2. Revisar si el email ya está registrado (esto ya lo tenías)
  const existeUsuario = await Agricultor.findOne({ email });

  if (existeUsuario) {
    const error = new Error('Email ya registrado. Intenta con otro.');
    return res.status(400).json({ msg: error.message });
  }

  // 3. Guardar el nuevo agricultor
  try {
    const agricultor = new Agricultor(req.body);
    
    // --- MODIFICACIÓN (Paso 2.1) ---
    // Generar token y asignarlo
    agricultor.token = generarId();
    
    const agricultorGuardado = await agricultor.save();
    
    // (Aquí iría la lógica para enviar el email de confirmación)
    // Por ahora, solo mostramos el token en la respuesta para pruebas
    console.log(`Token de confirmación (para simular email): ${agricultorGuardado.token}`);

    // 4. Enviar una respuesta exitosa
    res.json({ 
      msg: '¡Usuario registrado! Revisa tu email para confirmar tu cuenta.',
      // Devolvemos el token para poder probar la confirmación
      tokenParaPruebas: agricultorGuardado.token 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor al registrar el usuario.' });
  }
};


const confirmarCuenta = async (req, res) => {
  // 1. Obtener el token de la URL
  const { token } = req.params;

  // 2. Buscar al usuario con ese token
  const usuarioConfirmar = await Agricultor.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error('Token no válido o la cuenta ya fue confirmada.');
    return res.status(404).json({ msg: error.message });
  }

  // 3. Si existe, confirmar la cuenta y limpiar el token
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = ''; // El token es de un solo uso
    await usuarioConfirmar.save();

    res.json({ msg: 'Cuenta confirmada correctamente.' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor al confirmar la cuenta.' });
  }
};

const autenticar = async (req, res) => {
  // 1. Obtener datos del formulario
  const { email, password } = req.body;

  // 2. Comprobar si el usuario existe
  const usuario = await Agricultor.findOne({ email });
  if (!usuario) {
    const error = new Error('El usuario no existe.');
    return res.status(404).json({ msg: error.message });
  }

  // 3. Comprobar si está confirmado (¡Importante!)
  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada.');
    return res.status(403).json({ msg: error.message });
  }

  // 4. Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    // 5. Si es correcto, generar el JWT y enviarlo
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id), // ¡Aquí se genera el JWT!
    });
  } else {
    const error = new Error('Password incorrecto.');
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = (req, res) => {
  // El middleware 'checkAuth' ya hizo la validación y adjuntó el usuario en req.agricultor
  const { agricultor } = req;
  
  // Simplemente devolvemos los datos del perfil
  res.json(agricultor);
};

export { 
  registrar,
  confirmarCuenta, 
  autenticar,      
  perfil          
};