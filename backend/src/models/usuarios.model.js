const db = require('../config/db');

exports.findAll = async () => {
  const result = await db.query('SELECT * FROM usuarios');
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
  return result.rows[0];
};

exports.insert = async ({ nombre, correo }) => {
  // if (precio_venta <= precio_compra) {
  //   throw new Error("El precio de venta debe ser superior al de compra");
  // }
  const result = await db.query(
    'INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING *',
    [nombre, correo]
  );
  return result.rows[0];
};

exports.update = async (id, { nombre, correo }) => {
  const result = await db.query(
    'UPDATE usuarios SET nombre = $1, correo = $2 WHERE id_usuario = $3 RETURNING *',
    [nombre, correo, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
};
