const { Work } = require('../models/work.models');

exports.createWeeklyDetails = async (req, res, next) => {
  try {
    const { weekNumber, totalHours, employeeId } = req.body;
    const fetchedData = await Work.fetchWeekDetails(employeeId, weekNumber);
    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
      res.status(409);
      res.json({ status: 'error', message: 'Data Already Exists!' });
      return;
    }
    const data = await Work.saveWeekDetails(employeeId, weekNumber, totalHours);
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
    const { employeeId, weekNumber, dayNumber, totalHours, isOnLeave } =
      req.body;
    const weeklyData = await Work.fetchWeekDetails(employeeId, weekNumber);
    if (Array.isArray(weeklyData) && weeklyData.length > 0) {
      const weekId = weeklyData[0].id;

      const dailyDetails = await Work.fetchDailyDetails(weekId, dayNumber);

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
    } else {
      res.status(500);
      res.json({ status: 'error', message: 'Please Create Week Details!' });
    }
  } catch (error) {
    console.error('employee create', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.getWeekDetailsByEmployeeId = async (req, res, next) => {
  try {
    const fetchedData = await Work.fetchWeekDetailsByEmployeeId(
      req.params.employeeId
    );
    res.status(200);
    res.json({
      status: 'ok',
      weekDetails: fetchedData,
    });
  } catch (error) {
    console.error('employee create', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.getAllWorkDetails = async (req, res, next) => {
  try {
    const fetchedData = await Work.fetchAllWorkDetails(
      req.params.employeeId,
      req.params.weekNumber
    );
    res.status(200);
    res.json({
      status: 'ok',
      workDetails: fetchedData,
    });
  } catch (error) {
    console.error('getAllWorkDetails', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.createWorkPayment = async (req, res, next) => {
  try {
    const { employeeId, weekNumber, payAmount, taxAmount } = req.body;

    const fetchedData = await Work.fetchWeekDetails(employeeId, weekNumber);

    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
      const weekId = fetchedData[0].id;
      const paymentData = await Work.fetchPaymentDetails(weekId);
      if (Array.isArray(paymentData) && paymentData.length > 0) {
        res.status(409);
        res.json({ status: 'error', message: 'Data Already Exists!' });
        return;
      }

      const amountAfterTax =
        Number(payAmount) - (Number(payAmount) / 100) * Number(taxAmount);

      const data = await Work.saveWorkPayment(
        weekId,
        payAmount,
        taxAmount,
        amountAfterTax
      );
      res.status(200);
      res.json({ status: 'ok', createdId: data, message: 'Data Inserted!' });
      return;
    }
    res.status(400);
    res.json({ status: 'error', message: 'Invalid Payload Provided!' });
    return;
  } catch (error) {
    console.error('getAllWorkDetailsByEmployeeId', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};

exports.updateDetails = async (req, res, next) => {
  try {
    const { employeeId, weekNumber, payAmount, taxAmount, weeklyAllowedHours } =
      req.body;
    const fetchedWorkDetails = await Work.fetchWeekDetails(
      employeeId,
      weekNumber
    );
    if (Array.isArray(fetchedWorkDetails) && fetchedWorkDetails.length > 0) {
      const weekId = fetchedWorkDetails[0].id;

      const weeklyUpdated = await Work.updateWeeklyWorkDetails(
        weekId,
        weeklyAllowedHours
      );

      const amountAfterTax =
        Number(payAmount) - (Number(payAmount) / 100) * Number(taxAmount);

      const paymentUpdated = await Work.updatePaymentDetails(
        payAmount,
        taxAmount,
        amountAfterTax,
        weekId
      );

      let paymentCreated;
      if (paymentUpdated === 0) {
        paymentCreated = await Work.saveWorkPayment(
          weekId,
          payAmount,
          taxAmount,
          amountAfterTax
        );
      }

      const hasError =
        weeklyUpdated === 1 && (paymentUpdated === 1 || paymentCreated);

      res.status(200);
      res.json({
        status: !hasError ? 'error' : 'ok',
        message: !hasError ? 'Invalid Payload Provided!' : 'Data Updated!',
      });
      return;
    }
    res.status(200);
    res.json({
      status: 'error',
      message: 'Invalid Payload Provided!',
    });
    return;
  } catch (error) {
    console.error('updateDetails', error.message);
    res.status(500);
    res.json({ status: 'error', message: 'Internal Server Error!' });
  }
};
