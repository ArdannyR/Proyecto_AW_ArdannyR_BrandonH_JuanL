import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const agricultorSchema = mongoose.Schema(
  {
    // ... (tus campos existentes: nombre, email, password, token, confirmado)
    nombre: {
      type: String,
      required: true, 
      trim: true, 
    },
    email: {
      type: String,
      required: true, 
      unique: true, 
      trim: true,
    },
    password: {
      type: String,
      required: true, 
    },
    token: {
      type: String, 
    },
    confirmado: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,             
  }
);

// Middleware de pre-guardado para hashear password (Este ya lo tenías)
agricultorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comprobar el password del formulario vs el de la BD
agricultorSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Agricultor = mongoose.model('Agricultor', agricultorSchema);

export default Agricultor;