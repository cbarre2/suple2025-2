const db = require('../config/db');

exports.findAllByUsuario = async (id_usuario) => {
  const result = await db.query(
    'SELECT * FROM tareas WHERE id_usuario = $1 ORDER BY fecha_creacion DESC', 
    [id_usuario]
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query('SELECT * FROM tareas WHERE id_tarea = $1', [id]);
  return result.rows[0];
};

exports.insert = async ({ titulo, descripcion, id_usuario }) => {
  const result = await db.query(
    'INSERT INTO tareas (titulo, descripcion, id_usuario) VALUES ($1, $2, $3) RETURNING *',
    [titulo, descripcion, id_usuario]
  );
  return result.rows[0];
};

exports.update = async (id, { titulo, descripcion, estado }) => {
  const result = await db.query(
    'UPDATE tareas SET titulo = $1, descripcion = $2, estado = $3 WHERE id_tarea = $4 RETURNING *',
    [titulo, descripcion, estado, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query('DELETE FROM tareas WHERE id_tarea = $1', [id]);
};

// Método especial para cambiar solo el estado
exports.updateStatus = async (id, estado) => {
  const result = await db.query(
    'UPDATE tareas SET estado = $1 WHERE id_tarea = $2 RETURNING *',
    [estado, id]
  );
  return result.rows[0];
};