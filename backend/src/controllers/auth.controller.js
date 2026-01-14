const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db'); 

const login = async (req, res) => {
    // Usamos trim() para eliminar cualquier espacio accidental al inicio o final
    const usuario = req.body.usuario?.trim();
    const contrasena = req.body.contrasena?.trim();

    try {
        const result = await db.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas (Usuario no existe)' });
        }

        // Aplicamos trim() también a la contraseña de la DB por seguridad
        const dbPass = user.contrasena.trim();

        // Comparación técnica
        const validPass = await bcrypt.compare(contrasena, dbPass);
        
        console.log("¿Contraseña coincide?:", validPass); // Esto debe salir true

        if (!validPass) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas (Password incorrecto)' });
        }

        const token = jwt.sign(
            { id: user.id, rol: user.rol }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '8h' }
        );

        res.json({ token, user: { usuario: user.usuario, rol: user.rol } });

    } catch (error) {
        console.error("Error técnico:", error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = { login };