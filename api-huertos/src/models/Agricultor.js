import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const agricultorSchema = mongoose.Schema(
  {
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
    tokenExpires: {
      type: Date
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

// Middleware de pre-guardado para hashear password
agricultorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comprobar el password
agricultorSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Agricultor = mongoose.model('Agricultor', agricultorSchema);

export default Agricultor;