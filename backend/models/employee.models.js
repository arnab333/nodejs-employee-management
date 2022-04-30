const { db } = require('../db');

module.exports = {
  Employee: class Employee {
    constructor(fullName, email, status) {
      this.fullName = fullName;
      this.email = email;
      this.status = status;
    }

    async save(fullName, email, status) {
      try {
        const employeeDetails = await db.execute(
          'INSERT INTO employee_details (full_name, email, status) VALUES (?, ?, ?)',
          [this.fullName, this.email, this.status || 1]
        );
        return employeeDetails[0].insertId;
      } catch (error) {
        console.error('employee save', error.message);
        return error.message;
      }
    }

    static fetchAll() {
      return db.execute('SELECT * FROM employee_details');
    }

    static findById(id) {
      return db.execute('SELECT * FROM employee_details WHERE id = ?', [id]);
    }

    static findByEmail(email) {
      return db.execute('SELECT * FROM employee_details WHERE email = ?', [
        email,
      ]);
    }

    static async update(id, fullName, email, status) {
      try {
        const updated = await db.execute(
          'UPDATE employee_details SET full_name = ?, email = ?, status = ? WHERE id = ?',
          [fullName, email, status, id]
        );
        return updated[0].affectedRows;
      } catch (error) {
        console.error('employee save', error.message);
        return error.message;
      }
    }
  },
};
