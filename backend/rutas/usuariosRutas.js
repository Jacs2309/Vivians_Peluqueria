const express = require('express');
const router = express.Router();
const User = require('../modelos/usuariosModel');

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contraseña, tipo } = req.body;
    const newUser = new User({ nombre, correo, contraseña, tipo });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear usuario' });
  }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Actualizar usuario por id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, correo, contraseña, tipo } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, correo, contraseña, tipo },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario por id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  const user = await User.findOne({ correo, contraseña }); // *OJO: idealmente debería ir cifrada
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  res.json(user); // o mejor: solo { tipo: user.tipo, nombre: user.nombre, _id: user._id }
});

module.exports = router;
