const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios.routes');
const tareasRoutes = require('./routes/tareas.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tareas', tareasRoutes);

module.exports = app;