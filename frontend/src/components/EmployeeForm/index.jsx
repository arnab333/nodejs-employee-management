import React, { Fragment } from 'react';
import { Col, Row, Input, Select, PageHeader, Button } from 'antd';

const EmployeeForm = ({
  pageTitle,
  fullName,
  email,
  status,
  handleStatusChange,
  onInputChange,
  onSubmit,
  customRender,
}) => {
  return (
    <Fragment>
      <Row align="middle" justify="center">
        <Col xs={12}>
          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <PageHeader
                className="site-page-header"
                title={`Employee ${pageTitle}`}
              />
            </Col>
          </Row>

          {customRender()}

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              <Input
                size="large"
                placeholder="Full Name"
                value={fullName}
                name="fullName"
                onChange={onInputChange}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              <Input
                size="large"
                placeholder="Email"
                value={email}
                name="email"
                onChange={onInputChange}
              />
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ paddingBottom: 12 }}>
            <Col xs={12}>
              <Select
                defaultValue="lucy"
                style={{ width: '100%' }}
                onChange={handleStatusChange}
                value={status}>
                <Select.Option value={1}>Current</Select.Option>
                <Select.Option value={0}>Past</Select.Option>
              </Select>
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

export default EmployeeForm;
