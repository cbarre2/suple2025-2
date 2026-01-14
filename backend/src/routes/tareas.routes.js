const express = require('express');
const router = express.Router();
const controller = require('../controllers/tareas.controller');

router.get('/usuario/:id_usuario', controller.getByUsuario);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

router.patch('/:id/estado', controller.updateStatus);

module.exports = router;