const service = require('../services/tareas.service');

exports.getByUsuario = async (req, res) => {
  try {
    const data = await service.getByUsuario(req.params.id_usuario);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { estado } = req.body; // Se espera 'PENDIENTE' o 'COMPLETADA'
    const data = await service.toggleStatus(req.params.id, estado);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};