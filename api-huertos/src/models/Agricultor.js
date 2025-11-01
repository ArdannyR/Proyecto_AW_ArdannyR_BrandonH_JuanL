import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const agricultorSchema = mongoose.Schema(
  {
    // Campos que tendrá cada documento de Agricultor
    nombre: {
      type: String,
      required: true, 
      trim: true, 
    },
    email: {
      type: String,
      required: true, // El email es obligatorio
      unique: true, // No puede haber dos emails iguales
      trim: true,
    },
    password: {
      type: String,
      required: true, // El password es obligatorio
    },
    token: {
      type: String, // Se usará para confirmar la cuenta y resetear password
    },
    confirmado: {
      type: Boolean,
      default: false, // La cuenta empieza sin confirmar
    },
  },
  {
    timestamps: true,             
  }
);

agricultorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Agricultor = mongoose.model('Agricultor', agricultorSchema);

export default Agricultor;