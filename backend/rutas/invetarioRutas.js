const express = require('express');
const router = express.Router();
const Produ = require('../modelos/productosModel');
const Noti = require('../modelos/notificacionModel');

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, cantidad,unidad, precio, categoria, nivelminimo } = req.body;
    const newProdu = new Produ({ nombre, cantidad,unidad, precio, categoria, nivelminimo });
    await newProdu.save();
    res.status(201).json(newProdu);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear Producto' });
  }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const produ = await Produ.find();
    res.json(produ);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Productos' });
  }
});


// Buscar productos por nombre (exacto)
router.get('/', async (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).json({ error: 'El parámetro nombre es obligatorio' });
  }

  try {
    // Buscar productos cuyo nombre coincida exactamente (puedes hacerlo insensible a mayúsculas)
    const productos = await Produ.find({ nombre: new RegExp('^' + nombre + '$', 'i') });
    
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
});

// Obtener un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const produ = await Produ.findById(req.params.id);
    if (!produ) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(produ);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Producto' });
  }
});

// Actualizar usuario por id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, cantidad,unidad, precio, categoria, nivelminimo } = req.body;
    const produ = await Produ.findByIdAndUpdate(
      req.params.id,
      { nombre, cantidad, precio,unidad, categoria, nivelminimo },
      { new: true }
    );
    if (!produ) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(produ);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar Producto' });
  }
});

// Eliminar usuario por id
router.delete('/:id', async (req, res) => {
  try {
    const produ = await Produ.findByIdAndDelete(req.params.id);
    if (!produ) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar Producto' });
  }
});

// Actualizar cantidad (stock) del producto
router.put('/uso/:id', async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  if (typeof cantidad !== 'number') {
    return res.status(400).json({ error: 'El campo cantidad debe ser un número' });
  }

  try {
    if (cantidad < 0) {
      return res.status(400).json({ error: 'La cantidad no puede ser negativa' });
    }

    // Actualiza el producto
    const productoActualizado = await Produ.findByIdAndUpdate(
      id,
      { cantidad },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Revisa si está por debajo del nivel mínimo
    if (cantidad < productoActualizado.nivelminimo) {
      const mensaje = `El stock del producto "${productoActualizado.nombre}" está por debajo del nivel mínimo (${productoActualizado.nivelminimo})`;
      
      // Crea la notificación
      await Noti.create({
        mensaje
      });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

module.exports = router;
