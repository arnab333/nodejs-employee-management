const { db } = require('../db');

module.exports = {
  Work: class Work {
    static async saveWeekDetails(employeedId, weekNumber, totalHours) {
      try {
        const created = await db.execute(
          'INSERT INTO employee_weekly_work_details (employee_id, week_number, weekly_total_hours) VALUES (?, ?, ?)',
          [Number(employeedId), Number(weekNumber), Number(totalHours)]
        );
        return created[0].insertId;
      } catch (error) {
        console.error('employee save', error.message);
        return error.message;
      }
    }

    static async getWeekDetails(employeedId, weekNumber) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_weekly_work_details WHERE employee_id = ? AND week_number = ?',
          [employeedId, weekNumber]
        );
        return fetched[0];
      } catch (error) {
        console.error('getWeekDetails', error.message);
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

    static async getDailyDetails(weekId, dayNumber) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_daily_work_details WHERE week_id = ? AND day_number = ?',
          [weekId, dayNumber]
        );
        return fetched[0];
      } catch (error) {
        console.error('getWeekDetails', error.message);
        return error.message;
      }
    }

    static async getDailyDetailsById(id) {
      try {
        const fetched = await db.execute(
          'SELECT * FROM employee_daily_work_details WHERE id = ?',
          [id]
        );
        return fetched[0];
      } catch (error) {
        console.error('getWeekDetails', error.message);
        return error.message;
      }
    }
  },
};
