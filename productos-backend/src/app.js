const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productoRoutes = require('./routes/productos.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);

module.exports = app;