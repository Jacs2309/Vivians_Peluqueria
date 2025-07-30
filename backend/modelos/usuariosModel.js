const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  tipo: { type: String, enum: ['admin', 'empleado'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('usuarios', userSchema);
