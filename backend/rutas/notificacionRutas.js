const express = require('express');
const router = express.Router();
const Noti = require('../modelos/notificacionModel');


// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { mensaje } = req.body;
    const newNoti = new Noti({ mensaje});
    await newNoti.save();
    res.status(201).json(newNoti);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear notificacion' });
  }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const noti = await Noti.find();
    res.json(noti);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Notificacion' });
  }
});

// Obtener un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const noti = await Noti.findById(req.params.id);
    if (!noti) return res.status(404).json({ error: 'Notificacion no encontrado' });
    res.json(noti);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Notificacion' });
  }
});

// Actualizar usuario por id
router.put('/:id', async (req, res) => {
  try {
    const {mensaje} = req.body;
    const noti = await Noti.findByIdAndUpdate(
      req.params.id,
      { mensaje },
      { new: true }
    );
    if (!noti) return res.status(404).json({ error: 'Notificacion no encontrado' });
    res.json(noti);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al Notificacion usuario' });
  }
});

// Eliminar usuario por id
router.delete('/:id', async (req, res) => {
  try {
    const noti = await Noti.findByIdAndDelete(req.params.id);
    if (!noti) return res.status(404).json({ error: 'Notificaion no encontrado' });
    res.json({ message: 'Notificacion eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar Notificacion' });
  }
});

module.exports = router;
