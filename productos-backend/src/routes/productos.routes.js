const express = require('express');
const router = express.Router();
const controller = require('../controllers/productos.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

router.get('/',authenticateToken, controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authenticateToken, authorizeRole(['admin']), controller.create);
router.put('/:id', controller.update);
router.delete('/:id',authenticateToken,authorizeRole(['admin']), controller.remove);

module.exports = router;
