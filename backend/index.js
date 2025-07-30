const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // importar conexión
const usRutas = require('./rutas/usuariosRutas')
const invRutas = require('./rutas/invetarioRutas')
const notiRutas = require('./rutas/notificacionRutas')
const usoproducto = require('./rutas/usoProductoRtuas')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
connectDB();

// Rutas
app.use('/api/users', usRutas);
app.use('/api/inventario', invRutas)
app.use('/api/notificacion', notiRutas)
app.use('/api/usoproducto', usoproducto)

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
