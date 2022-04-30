import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { routes } from './helpers/routes';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import Home from './pages/Home';
import EmployeeCreate from './pages/EmployeeCreate';
import WorkDetails from './pages/WorkDetails';

const App = () => {
  return (
    <Fragment>
      <AppLayout>
        <Routes>
          <Route path={routes.home()} element={<Home />} />
          <Route path={routes.employees()} element={<Employees />} />
          <Route path={routes.employeeCreate()} element={<EmployeeCreate />} />
          <Route
            path={routes.employeeDetails()}
            element={<EmployeeDetails />}
          />
          <Route path={routes.workDetails()} element={<WorkDetails />} />
        </Routes>
      </AppLayout>
    </Fragment>
  );
};

export default App;
