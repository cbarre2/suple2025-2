const model = require('../models/tareas.models');

exports.getByUsuario = async (id_usuario) => {
  return await model.findAllByUsuario(id_usuario);
};

exports.getById = async (id) => {
  return await model.findById(id);
};

exports.create = async (data) => {
  return await model.insert(data);
};

exports.update = async (id, data) => {
  return await model.update(id, data);
};

exports.delete = async (id) => {
  return await model.remove(id);
};

exports.toggleStatus = async (id, estado) => {
  return await model.updateStatus(id, estado);
};