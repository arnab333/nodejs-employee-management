import React, { Fragment, useState } from 'react';
import { message, notification } from 'antd';
import EmployeeForm from '../components/EmployeeForm';
import { rootPath } from '../helpers/apiPaths';

const EmployeeCreate = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(1);

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
      const rawData = await fetch(`${rootPath}/employee/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await rawData.json();
      notification.success({ message: response.message });
      setEmail('');
      setFullName('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <EmployeeForm
        pageTitle={`Create`}
        fullName={fullName}
        email={email}
        status={status}
        handleStatusChange={handleStatusChange}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </Fragment>
  );
};

export default EmployeeCreate;
