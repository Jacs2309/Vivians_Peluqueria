// backend/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://julicanas:Qhem1Cpm1CW28kNx@cluster0.kumb6.mongodb.net/vpeluqueria?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // detiene el servidor si falla
  }
};

module.exports = connectDB;



