const { Employee } = require('../models/employee.models');

exports.getAll = async (req, res, next) => {
  try {
    const data = await Employee.fetchAll();
    res.status(200);
    res.json({ status: 'ok', employees: data[0] });
  } catch (error) {
    console.error('employee getAll', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.create = async (req, res, next) => {
  try {
    const { fullName, email, status } = req.body;
    const fetched = await Employee.findByEmail(email);
    if (Array.isArray(fetched) && fetched.length > 0) {
      res.status(409);
      res.json({ status: 'error', message: 'Data Already Exists!' });
      return;
    }
    const empObj = new Employee(fullName, email, status);
    const data = await empObj.save();
    res.status(200);
    res.json({ status: 'ok', createdId: data, message: 'Data Inserted!' });
  } catch (error) {
    console.error('employee create', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await Employee.findById(req.params.id);
    res.status(200);
    res.json({ status: 'ok', employeeDetails: data[0][0] });
  } catch (error) {
    console.error('employee getAll', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { fullName, email, status } = req.body;
    const data = await Employee.update(req.params.id, fullName, email, status);
    res.status(200);
    res.json({
      status: 'ok',
      message: data === 1 ? 'Data Updated!' : 'Invalid Payload Provided!',
    });
  } catch (error) {
    console.error('employee update', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};
