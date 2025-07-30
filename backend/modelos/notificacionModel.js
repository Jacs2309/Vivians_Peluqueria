const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
}, {timestamps: true,});

module.exports = mongoose.model('notificaciones', notificacionSchema);

