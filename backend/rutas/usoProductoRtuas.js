const express = require('express');
const router = express.Router();
const UsoProdu = require('../modelos/usoProductoModel');

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { nombreProducto, cantidadUsada, unidad, observaciones, fecha} = req.body;
    const newUsoProdu = new UsoProdu({nombreProducto, cantidadUsada,unidad, observaciones, fecha });
    await newUsoProdu.save();
    res.status(201).json(newUsoProdu);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear Uso Producto' });
  }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usoProdu = await UsoProdu.find();
    res.json(usoProdu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Uso Productos' });
  }
});

// Obtener un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const usoprodu = await UsoProdu.findById(req.params.id);
    if (!usoprodu) return res.status(404).json({ error: 'Uso Producto no encontrado' });
    res.json(usoprodu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Uso Producto' });
  }
});

// Actualizar usuario por id
router.put('/:id', async (req, res) => {
  try {
    const { nombreProdcuto, cantidadUsada, unidad, obervaciones, fecha } = req.body;
    const usoprodu = await UsoProdu.findByIdAndUpdate(
      req.params.id,
      { nombreProdcuto, cantidadUsada, unidad, obervaciones, fecha },
      { new: true }
    );
    if (!usoprodu) return res.status(404).json({ error: 'Uso Producto no encontrado' });
    res.json(usoprodu);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar Uso Producto' });
  }
});

// Eliminar usuario por id
router.delete('/:id', async (req, res) => {
  try {
    const usoprodu = await UsoProdu.findByIdAndDelete(req.params.id);
    if (!usoprodu) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Uso Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar Uso Producto' });
  }
});

module.exports = router;
