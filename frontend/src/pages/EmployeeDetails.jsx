import {
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { rootPath } from '../helpers/apiPaths';

const EmployeeDetails = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState('');
  const params = useParams();

  useEffect(() => {
    if (params.id && isFetching) {
      (async () => {
        try {
          const rawData = await fetch(`${rootPath}/employee/${params.id}`);
          const response = await rawData.json();
          setIsFetching(false);
          if (
            response.employeeDetails &&
            Object.keys(response.employeeDetails).length > 0
          ) {
            setFullName(response.employeeDetails.full_name);
            setEmail(response.employeeDetails.email);
            setStatus(response.employeeDetails.status);
          }
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
  }, [isFetching, params.id]);

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const onInputChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    if (targetName === 'fullName') {
      setFullName(targetValue);
    } else if (targetName === 'email') {
      setEmail(targetValue);
    }
  };

  const onSubmit = async () => {
    if (!fullName || !email) {
      message.error('Please fill all fields');
      return;
    }
    const data = {
      fullName,
      email,
      status,
    };
    try {
      const rawData = await fetch(`${rootPath}/employee/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await rawData.json();
      notification.success({ message: response.message });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <EmployeeForm
        pageTitle={`Details`}
        fullName={fullName}
        email={email}
        status={status}
        handleStatusChange={handleStatusChange}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        customRender={() => (
          <Fragment>
            <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
              <Col
                xs={12}
                style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setShowModal('weekly')}>
                  Add Weekly Work Details
                </Button>
              </Col>

              <Col
                xs={12}
                style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setShowModal('Daily')}>
                  Add Daily Work Details
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
      />

      <Modal
        title={
          showModal === 'weekly'
            ? 'Add Weekly Work Details'
            : 'Add Daily Work Details'
        }
        visible={!!showModal}
        onCancel={() => setShowModal('')}
        footer={null}>
        {showModal === 'weekly' ? (
          <WeeklyWorkDetails
            employeedId={params.id}
            setShowModal={setShowModal}
          />
        ) : (
          <DailyWorkDetails
            employeedId={params.id}
            setShowModal={setShowModal}
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default EmployeeDetails;

const weekCollection = new Array(52).fill('').map((_, idx) => {
  return (
    <Select.Option key={idx + 1} value={idx + 1}>
      Week {idx + 1}
    </Select.Option>
  );
});

const WeeklyWorkDetails = ({ employeedId, setShowModal }) => {
  const [weekNumber, setWeekNumber] = useState(1);
  const [weeklyHours, setWeeklyHours] = useState('');

  const handleChange = (value) => {
    setWeekNumber(value);
  };

  const handleWeeklyHours = (value) => {
    if (isNaN(value)) {
      message.error('Please enter number betweek 1 to 25');
      return;
    }
    if (Number(value) > 25) {
      message.warn('Max 25 working hours allowed in a week');
      return;
    }

    setWeeklyHours(value);
  };

  const onSubmit = async () => {
    if (!employeedId) {
      message.error('Employee Id is required!');
      return;
    }

    if (!weeklyHours) {
      message.error('Please fill all fields');
      return;
    }

    const data = {
      employeedId,
      weekNumber,
      totalHours: weeklyHours,
    };

    try {
      const rawData = await fetch(`${rootPath}/work/create-weekly-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await rawData.json();
      if (response.status === 'ok') {
        notification.success({ message: response.message });
        setWeekNumber(1);
        setWeeklyHours('');
        setShowModal('');
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
      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12}>
          Week Number
          <Select
            defaultValue="lucy"
            style={{ width: '100%' }}
            onChange={handleChange}
            value={weekNumber}>
            {weekCollection.map((el) => el)}
          </Select>
        </Col>
      </Row>

      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12}>
          Weekly Hours
          <Input
            value={weeklyHours}
            onChange={(e) => handleWeeklyHours(e.target.value)}
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
    </Fragment>
  );
};

const dayCollection = new Array(7).fill('').map((_, idx) => {
  return (
    <Select.Option key={idx + 1} value={idx + 1}>
      Day {idx + 1}
    </Select.Option>
  );
});

const DailyWorkDetails = ({ employeedId, setShowModal }) => {
  const [weekNumber, setWeekNumber] = useState(1);
  const [dayNumber, setDaysNumber] = useState(1);
  const [isLeave, setIsLeave] = useState(false);
  const [totalHours, setTotalHours] = useState('');

  const handleWeekChange = (value) => {
    setWeekNumber(value);
  };

  const handleDayChange = (value) => {
    setDaysNumber(value);
  };

  const handleHours = (value) => {
    if (isNaN(value)) {
      message.error('Please enter number betweek 1 to 25');
      return;
    }
    if (Number(value) > 8) {
      message.warn('Max 8 working hours allowed in a day');
      return;
    }

    setTotalHours(value);
  };

  const handleCheckbox = (e) => {
    setIsLeave(e.target.checked);
    if (e.target.checked) {
      setTotalHours('');
    }
  };

  const onSubmit = async () => {
    if (!employeedId) {
      message.error('Employee Id is required!');
      return;
    }

    if (!isLeave && !totalHours) {
      message.error('Please fill all fields');
      return;
    }

    const data = {
      employeedId,
      weekNumber,
      dayNumber,
      totalHours,
      isOnLeave: isLeave === true ? 1 : 0,
    };

    try {
      const rawData = await fetch(`${rootPath}/work/create-daily-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await rawData.json();
      if (response.status === 'ok') {
        notification.success({ message: response.message });
        setWeekNumber(1);
        handleHours('');
        setShowModal('');
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
      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12}>
          Week Number
          <Select
            defaultValue="lucy"
            style={{ width: '100%' }}
            onChange={handleWeekChange}
            value={weekNumber}>
            {weekCollection.map((el) => el)}
          </Select>
        </Col>
      </Row>

      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12}>
          Day Number
          <Select
            defaultValue="lucy"
            style={{ width: '100%' }}
            onChange={handleDayChange}
            value={dayNumber}>
            {dayCollection.map((el) => el)}
          </Select>
        </Col>
      </Row>

      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12}>
          Total Hours
          <Input
            value={totalHours}
            onChange={(e) => handleHours(e.target.value)}
            disabled={isLeave}
          />
        </Col>
      </Row>

      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12}>
          <Checkbox checked={isLeave} onChange={handleCheckbox}>
            Is On Leave?
          </Checkbox>
        </Col>
      </Row>

      <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="button" onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};
