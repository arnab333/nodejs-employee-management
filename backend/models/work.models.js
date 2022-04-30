const { db } = require('../db');

module.exports = {
  Work: class Work {
    static async saveWeekDetails(employeeId, weekNumber, totalHours) {
      try {
        const created = await db.execute(
          'INSERT INTO employee_weekly_work_details (employee_id, week_number, weekly_total_hours) VALUES (?, ?, ?)',
          [Number(employeeId), Number(weekNumber), Number(totalHours)]
        );
        return created[0].insertId;
      } catch (error) {
        console.error('saveWeekDetails', error.message);
        return error.message;
      }
    }

    static async fetchWeekDetailsByEmployeeId(employeeId) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_weekly_work_details WHERE employee_id = ?',
          [employeeId]
        );
        return fetched[0];
      } catch (error) {
        console.error('fetchWeekDetailsByEmployeeId', error.message);
        return error.message;
      }
    }

    static async fetchWeekDetails(employeeId, weekNumber) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_weekly_work_details WHERE employee_id = ? AND week_number = ?',
          [Number(employeeId), Number(weekNumber)]
        );
        return fetched[0];
      } catch (error) {
        console.error('fetchWeekDetails', error.message);
        return error.message;
      }
    }

    static async saveDailyDetails(weekId, dayNumber, totalHours, isOnLeave) {
      try {
        const created = await db.execute(
          'INSERT INTO employee_daily_work_details (week_id, day_number, daily_total_hours, is_on_leave) VALUES (?, ?, ?, ?)',
          [
            Number(weekId),
            Number(dayNumber),
            Number(totalHours),
            Number(isOnLeave),
          ]
        );
        return created[0].insertId;
      } catch (error) {
        console.error('saveDailyDetails', error.message);
        return error.message;
      }
    }

    static async fetchDailyDetails(weekId, dayNumber) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_daily_work_details WHERE week_id = ? AND day_number = ?',
          [weekId, dayNumber]
        );
        return fetched[0];
      } catch (error) {
        console.error('fetchDailyDetails', error.message);
        return error.message;
      }
    }

    static async fetchAllWorkDetails(employeeId, weekNumber) {
      try {
        const fetched = await db.execute(
          'SELECT ewwd.employee_id, ewwd.week_number, ewwd.weekly_total_hours, SUM(edwd.daily_total_hours) AS total_hours_worked, SUM(edwd.is_on_leave) AS total_leaves, epd.total_pay_amount, epd.tax_amount, epd.amount_after_tax FROM employee_weekly_work_details AS ewwd LEFT JOIN employee_daily_work_details AS edwd ON ewwd.id = edwd.week_id LEFT JOIN employee_payment_details AS epd ON ewwd.id = epd.week_id WHERE ewwd.employee_id = ? AND ewwd.week_number = ?;',
          [employeeId, weekNumber]
        );
        return fetched[0][0];
      } catch (error) {
        console.error('fetchAllWorkDetails', error.message);
        return error.message;
      }
    }

    static async saveWorkPayment(weekId, payAmount, taxAmount, amountAfterTax) {
      try {
        const created = await db.execute(
          'INSERT INTO employee_payment_details (week_id, total_pay_amount, tax_amount, amount_after_tax) VALUES (?, ?, ?, ?)',
          [
            Number(weekId),
            Number(payAmount),
            Number(taxAmount),
            Number(amountAfterTax),
          ]
        );
        return created[0].insertId;
      } catch (error) {
        console.error('saveWorkPayment', error.message);
        return error.message;
      }
    }

    static async fetchPaymentDetails(weekId) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_payment_details WHERE week_id = ?',
          [weekId]
        );
        return fetched[0];
      } catch (error) {
        console.error('fetchPaymentDetails', error.message);
        return error.message;
      }
    }

    static async updatePaymentDetails(
      payAmount,
      taxAmount,
      amountAfterTax,
      weekId
    ) {
      try {
        const updated = await db.execute(
          'UPDATE employee_payment_details SET total_pay_amount = ?, tax_amount = ?, amount_after_tax = ? WHERE week_id = ?',
          [payAmount, taxAmount, amountAfterTax, weekId]
        );
        return updated[0].affectedRows;
      } catch (error) {
        console.error('updatePaymentDetails', error.message);
        return error.message;
      }
    }

    static async updateWeeklyWorkDetails(weekId, weeklyAllowedHours) {
      try {
        const updated = await db.execute(
          'UPDATE employee_weekly_work_details SET weekly_total_hours = ? WHERE id = ?',
          [weeklyAllowedHours, weekId]
        );
        return updated[0].affectedRows;
      } catch (error) {
        console.error('updateWeeklyWorkDetails', error.message);
        return error.message;
      }
    }
  },
};
