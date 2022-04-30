const express = require('express');

const router = express.Router();

const {
  createWeeklyDetails,
  createDailyDetails,
  getWeekDetailsByEmployeeId,
  getAllWorkDetails,
  createWorkPayment,
  updateDetails,
} = require('../controllers/work.controllers');

router.post('/create-weekly-details', createWeeklyDetails);

router.post('/create-daily-details', createDailyDetails);

router.get('/get-week-details/:employeeId', getWeekDetailsByEmployeeId);

router.get('/get-all/:employeeId/:weekNumber', getAllWorkDetails);

router.post('/save-payment', createWorkPayment);

router.put('/update', updateDetails);

module.exports = router;
