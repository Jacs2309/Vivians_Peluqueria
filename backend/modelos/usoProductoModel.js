const mongoose = require('mongoose');

const usoProductoSchema = new mongoose.Schema({
  nombreProducto: { type: String, required: true },
  cantidadUsada: { type: Number, required: true },       
  unidad: { type: String, required: true },
  observaciones: { type: String, required: true },
  fecha: {type: Date, required: true}
});

module.exports = mongoose.model('usoProducto', usoProductoSchema);

