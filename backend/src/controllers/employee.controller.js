const service = require('../services/employee.service');

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAllEmployees();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await service.getEmployeeById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await service.createEmployee(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.updateEmployee(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.deleteEmployee(req.params.id);
    res.json({ message: 'Empleado eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
