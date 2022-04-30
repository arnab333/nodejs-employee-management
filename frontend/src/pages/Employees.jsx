import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row, Select, Table } from 'antd';
import { rootPath } from '../helpers/apiPaths';
import { useNavigate } from 'react-router-dom';
import { routes } from '../helpers/routes';

const Employees = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectValue, setSelectValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) {
      (async () => {
        try {
          const rawData = await fetch(`${rootPath}/employee/get-all`);
          const response = await rawData.json();
          const weekFetchArray = [];
          setIsFetching(false);
          if (
            Array.isArray(response.employees) &&
            response.employees.length > 0
          ) {
            let employees = response.employees.map((el) => ({
              ...el,
              key: el.id,
            }));
            for (let i = 0; i < employees.length; i++) {
              weekFetchArray.push(
                fetch(`${rootPath}/work/get-week-details/${employees[i].id}`)
              );
            }

            if (
              weekFetchArray.length > 0 &&
              Array.isArray(employees) &&
              employees.length > 0
            ) {
              const allWeekData = await Promise.all(weekFetchArray);
              for (let i = 0; i < allWeekData.length; i++) {
                const element = await allWeekData[i].json();
                employees = employees.map((el) => {
                  if (
                    element.weekDetails &&
                    element.weekDetails[0] &&
                    el.id === element.weekDetails[0].employee_id
                  ) {
                    return { ...el, weeklyDetails: element.weekDetails };
                  }
                  return { ...el };
                });
              }
            }
            setData(employees);
          }
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
  }, [isFetching]);

  const onSelectClick = (id) => {
    navigate(routes.employeeDetails(id));
  };

  const handleSelectChange = (employeeId, weekNumber) => {
    const match = data.find((el) => el.id === employeeId);
    setSelectValue(weekNumber);
    navigate(routes.workDetails(employeeId, weekNumber), {
      state: { employee: match },
    });
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
              <Table
                dataSource={data}
                columns={getColumns({
                  onSelectClick,
                  handleSelectChange,
                  selectValue,
                })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Employees;

const getColumns = ({ onSelectClick, handleSelectChange, selectValue }) => {
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
            <Row>
              <Col xs={24}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => onSelectClick(record.id)}>
                  Select
                </Button>
              </Col>
            </Row>
            {record.weeklyDetails && record.weeklyDetails.length > 0 && (
              <Row style={{ paddingTop: 12 }}>
                <Col xs={24}>
                  <Select
                    style={{ width: '100%' }}
                    value={selectValue}
                    onChange={(weekNumber) =>
                      handleSelectChange(record.id, weekNumber)
                    }>
                    <Select.Option value={''}>Select Week</Select.Option>
                    {record.weeklyDetails.map((el) => {
                      return (
                        <Select.Option
                          key={el.week_number}
                          value={el.week_number}>
                          Week {el.week_number}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
              </Row>
            )}
          </Fragment>
        );
      },
    },
  ];
};
