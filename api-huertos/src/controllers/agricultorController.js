import Agricultor from '../models/Agricultor.js';

const registrar = async (req, res) => {
  // 1. Obtener los datos del cuerpo de la petición (del formulario)
  const { nombre, email, password } = req.body;

  // 2. Revisar si el email ya está registrado
  const existeUsuario = await Agricultor.findOne({ email });

  if (existeUsuario) {
    const error = new Error('Email ya registrado. Intenta con otro.');
    return res.status(400).json({ msg: error.message });
  }

  // 3. Guardar el nuevo agricultor
  try {
    const agricultor = new Agricultor(req.body);

    const agricultorGuardado = await agricultor.save();
    
    // (Aquí iría la lógica para enviar el email de confirmación?)

    // 4. Enviar una respuesta exitosa
    res.json({ msg: '¡Usuario registrado! Revisa tu email para confirmar tu cuenta.' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor al registrar el usuario.' });
  }
};

export { 
  registrar 
};