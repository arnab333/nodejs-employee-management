const express = require('express');

const router = express.Router();

const {
  getAll,
  create,
  get,
  update,
} = require('../controllers/employee.controllers');

router.get('/get-all', getAll);

router.get('/:id', get);

router.put('/:id', update);

router.post('/create', create);

module.exports = router;
