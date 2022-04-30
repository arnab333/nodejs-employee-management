const express = require('express');

const router = express.Router();

const {
  createWeeklyDetails,
  createDailyDetails,
} = require('../controllers/work.controllers');

router.post('/create-weekly-details', createWeeklyDetails);

router.post('/create-daily-details', createDailyDetails);

module.exports = router;
