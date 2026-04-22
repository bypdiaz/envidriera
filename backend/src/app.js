const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Ruta de Prueba
app.get('/', (req,res) => {
    res.send('API Envidriera funcionando 🚀');
});

const userRoutes = require('./routes/userRoutes');

// Rutas
app.use('/api/users', userRoutes);

const businessRoutes = require('./routes/businessRoutes');

app.use('/api/businesses', businessRoutes);

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

app.use('/uploads', express.static('uploads'));

module.exports = app;