const model = require('../models/employee.model');

exports.getAllEmployees = async () => {
  return await model.findAll();
};

exports.getEmployeeById = async (id) => {
  return await model.findById(id);
};

exports.createEmployee = async (data) => {
  return await model.insert(data);
};

exports.updateEmployee = async (id, data) => {
  return await model.update(id, data);
};

exports.deleteEmployee = async (id) => {
  return await model.remove(id);
};
