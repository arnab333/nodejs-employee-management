import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'antd';
import { rootPath } from '../helpers/apiPaths';
import { useNavigate } from 'react-router-dom';
import { routes } from '../helpers/routes';

const Employees = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) {
      (async () => {
        try {
          const rawData = await fetch(`${rootPath}/employee/get-all`);
          const response = await rawData.json();
          setIsFetching(false);
          if (
            Array.isArray(response.employees) &&
            response.employees.length > 0
          ) {
            setData(response.employees.map((el) => ({ ...el, key: el.id })));
          }
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
  }, [isFetching]);

  const onSelect = (id) => {
    navigate(routes.employeeDetails(id));
  };

  return (
    <Fragment>
      <Row align="middle" justify="center">
        <Col xs={24}>
          <Row align="middle" justify="center">
            <Col
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'end',
                paddingBottom: 12,
              }}>
              <Button
                type="primary"
                htmlType="button"
                onClick={() => navigate(routes.employeeCreate())}>
                Create
              </Button>
            </Col>
          </Row>
          <Row align="middle" justify="center">
            <Col xs={12}>
              <Table dataSource={data} columns={getColumns(onSelect)} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Employees;

const getColumns = (onSelect) => {
  return [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return <Fragment>{record.status === 1 ? 'Current' : 'Past'}</Fragment>;
      },
    },
    {
      title: 'Action',
      key: 'status',
      render: (_, record) => {
        return (
          <Fragment>
            <Button
              type="primary"
              htmlType="button"
              onClick={() => onSelect(record.id)}>
              Select
            </Button>
          </Fragment>
        );
      },
    },
  ];
};
