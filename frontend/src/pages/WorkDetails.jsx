import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Input,
  message,
  notification,
  PageHeader,
  Row,
} from 'antd';
import { useLocation } from 'react-router-dom';
import { rootPath } from '../helpers/apiPaths';

const WorkDetails = () => {
  const [payAmount, setPayAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [totalHoursWorked, setTotalHoursWorked] = useState('');
  const [amountAfterTax, setAmountAfterTax] = useState('');
  const [totalLeaves, setTotalLeaves] = useState('');
  const [weeklyAllowedHours, setWeeklyAllowedHours] = useState('');
  const location = useLocation();
  const employeeId = location.pathname.split('/')[2];
  const weekNumber = location.pathname.split('/')[3];
  const employee = location.state.employee;

  useEffect(() => {
    (async () => {
      try {
        const rawData = await fetch(
          `${rootPath}/work/get-all/${employeeId}/${weekNumber}`
        );
        const response = await rawData.json();
        if (response.workDetails) {
          setTotalHoursWorked(response.workDetails.total_hours_worked);
          setTaxAmount(response.workDetails.tax_amount);
          setPayAmount(response.workDetails.total_pay_amount);
          setAmountAfterTax(response.workDetails.amount_after_tax);
          setTotalLeaves(response.workDetails.total_leaves);
          setWeeklyAllowedHours(response.workDetails.weekly_total_hours);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPaymentChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      message.error('Please enter number');
      return;
    }
    setPayAmount(value);
    setAmountAfterTax(calculateAmountAfterTax(value, taxAmount));
  };

  const onTaxChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      message.error('Please enter number');
      return;
    }
    setTaxAmount(value);
    setAmountAfterTax(calculateAmountAfterTax(payAmount, value));
  };

  const onWeeklyAllowedHours = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      message.error('Please enter number');
      return;
    }
    setWeeklyAllowedHours(value);
  };

  const onSubmit = async () => {
    const data = {
      employeeId,
      weekNumber,
      payAmount,
      taxAmount,
      weeklyAllowedHours,
    };

    try {
      const rawData = await fetch(`${rootPath}/work/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await rawData.json();
      if (response.status === 'ok') {
        notification.success({ message: response.message });
      } else {
        notification.error({ message: response.message });
      }
    } catch (error) {
      console.log(error.message);
      notification.error({ message: error.message });
    }
  };

  return (
    <Fragment>
      <Row align="middle" justify="center">
        <Col xs={12}>
          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <PageHeader
                className="site-page-header"
                title={`Employee ${employee?.full_name} - Week ${weekNumber} Report`}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              Total Hours Worked
              <Input
                size="large"
                placeholder="Total Hours Worked"
                name="totalHoursWorked"
                value={totalHoursWorked}
                disabled
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              Payment Amount
              <Input
                size="large"
                placeholder="Payment Amount"
                name="payAmount"
                value={payAmount}
                onChange={onPaymentChange}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              Tax Amount
              <Input
                size="large"
                placeholder="Tax Amount"
                name="taxAmount"
                value={taxAmount}
                onChange={onTaxChange}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              Amount After Tax
              <Input
                size="large"
                placeholder="Amount After Tax"
                name="amountAfterTax"
                value={amountAfterTax}
                disabled
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              Total Leaves Taken
              <Input
                size="large"
                placeholder="Total Leaves Taken"
                name="totalLeaves"
                value={totalLeaves}
                disabled
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              Weekly Allowed Hours
              <Input
                size="large"
                placeholder="Weekly Allowed Hours"
                name="weeklyAllowedHours"
                value={weeklyAllowedHours}
                onChange={onWeeklyAllowedHours}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="button" onClick={onSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default WorkDetails;

const calculateAmountAfterTax = (payAmount, taxAmount) => {
  return Number(payAmount) - (Number(payAmount) / 100) * Number(taxAmount);
};
