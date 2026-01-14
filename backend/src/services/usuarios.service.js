const model = require('../models/usuarios.model');

exports.getAll= async () => {
  return await model.findAll();
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
