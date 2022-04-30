const { Work } = require('../models/work.models');

exports.createWeeklyDetails = async (req, res, next) => {
  try {
    const { weekNumber, totalHours, employeedId } = req.body;
    const fetchedData = await Work.getWeekDetails(employeedId, weekNumber);
    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
      res.status(409);
      res.json({ status: 'error', message: 'Data Already Exists!' });
      return;
    }
    const data = await Work.saveWeekDetails(
      employeedId,
      weekNumber,
      totalHours
    );
    res.status(200);
    res.json({ status: 'ok', createdId: data, message: 'Data Inserted!' });
  } catch (error) {
    console.error('employee create', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.createDailyDetails = async (req, res, next) => {
  try {
    const { employeedId, weekNumber, dayNumber, totalHours, isOnLeave } =
      req.body;
    const weeklyData = await Work.getWeekDetails(employeedId, weekNumber);
    if (Array.isArray(weeklyData) && weeklyData.length > 0) {
      const weekId = weeklyData[0].id;

      const dailyDetails = await Work.getDailyDetails(weekId, dayNumber);

      if (Array.isArray(dailyDetails) && dailyDetails.length > 0) {
        res.status(409);
        res.json({ status: 'error', message: 'Data Already Exists!' });
        return;
      }

      const data = await Work.saveDailyDetails(
        weekId,
        dayNumber,
        totalHours,
        isOnLeave
      );

      res.status(200);
      res.json({ status: 'ok', createdId: data, message: 'Data Inserted!' });
    }
  } catch (error) {
    console.error('employee create', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};
