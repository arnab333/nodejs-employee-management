import React, { Fragment, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { routes } from '../../helpers/routes';
import { useNavigate, useLocation } from 'react-router-dom';
const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const [selectedKeys, setSelectedKeys] = useState('1');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const match = navItems.find((el) => el.path === location.pathname);
    if (match) {
      setSelectedKeys(match.key);
    }
  }, [location, navigate]);

  const onMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setSelectedKeys(key);
    const match = navItems.find((el) => el.key === key);

    if (match) navigate(match.path);
  };
  return (
    <Fragment>
      <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKeys]}
            onClick={onMenuClick}
            items={navItems.map((el, index) => {
              return el;
            })}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">{children}</div>
        </Content>
      </Layout>
    </Fragment>
  );
};

export default AppLayout;

const navItems = [
  {
    key: '1',
    label: `Home`,
    path: routes.home(),
  },
  {
    key: '2',
    label: `Employees`,
    path: routes.employees(),
  },
];
