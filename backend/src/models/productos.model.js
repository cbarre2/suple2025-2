const db = require('../config/db');

exports.findAll = async () => {
  const result = await db.query('SELECT * FROM productos');
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query('SELECT * FROM productos WHERE codigo = $1', [id]);
  return result.rows[0];
};

exports.insert = async ({ nombre, tipo, stock, precio_compra, precio_venta, anticipo = null }) => {
  if (precio_venta <= precio_compra) {
    throw new Error("El precio de venta debe ser superior al de compra");
  }
  const result = await db.query(
    'INSERT INTO productos (nombre, tipo, stock, precio_compra, precio_venta, anticipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nombre, tipo, stock, precio_compra, precio_venta, anticipo]
  );
  return result.rows[0];
};

exports.update = async (id, { nombre, tipo, stock, precio_compra, precio_venta, anticipo }) => {
  const result = await db.query(
    'UPDATE productos SET nombre = $1, tipo = $2, stock = $3, precio_compra = $4, precio_venta = $5, anticipo = $6 WHERE codigo = $7 RETURNING *',
    [nombre, tipo, stock, precio_compra, precio_venta, anticipo, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await db.query('DELETE FROM productos WHERE codigo = $1', [id]);
};
