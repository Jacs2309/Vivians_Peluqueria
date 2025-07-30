const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true }, 
  unidad: {type: String, required: true},  
  precio: { type: Number, required: true },     
  categoria: { type: String, required: true },
  nivelminimo: {type: Number, required: true }
}, {timestamps: true,});

module.exports = mongoose.model('inventario', productoSchema);

