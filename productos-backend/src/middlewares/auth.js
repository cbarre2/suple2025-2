const jwt = require('jsonwebtoken');

// ¿Tiene un token válido?
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Aquí guardamos los datos del usuario (incluyendo su rol)
    next();
  } catch (err) {
    res.status(403).json({ mensaje: 'Token no válido o expirado.' });
  }
};

// ¿Su rol está permitido para esta ruta?
const authorizeRole = (rolesPermitidos) => {
  return (req, res, next) => {
    if (req.user && rolesPermitidos.includes(req.user.rol)) {
      next();
    } else {
      res.status(403).json({ mensaje: `Prohibido. Requiere rol: ${rolesPermitidos}` });
    }
  };
};

// Exportamos 
module.exports = { authenticateToken, authorizeRole };