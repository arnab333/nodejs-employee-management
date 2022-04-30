const { db } = require('../db');

module.exports = class Payment {
  constructor(weekId, totalPayAmount, taxAmount, amountAfterTax) {
    this.weekId = weekId;
    this.totalPayAmount = totalPayAmount;
    this.taxAmount = taxAmount;
    this.amountAfterTax = amountAfterTax;
  }

  save() {
    return db.execute(
      'INSERT INTO employee_payment_details (week_id, total_pay_amount, tax_amount, amount_after_tax) VALUES (?, ?, ?, ?)',
      [this.weekId, this.totalPayAmount, this.taxAmount, this.amountAfterTax]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM employee_payment_details');
  }

  static findById(id) {
    return db.execute('SELECT * FROM employee_payment_details WHERE id = ?', [
      id,
    ]);
  }
};
