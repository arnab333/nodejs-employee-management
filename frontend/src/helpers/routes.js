export const routes = {
  home: () => {
    return '/';
  },
  employees: () => {
    return '/employees';
  },
  employeeCreate: () => {
    return `/employee/create`;
  },
  employeeDetails: (id) => {
    return id ? `/employee/${id}` : `/employee/:id`;
  },
  workDetails: (employeeId, weekNumber) => {
    return employeeId
      ? `/work/${employeeId}/${weekNumber}`
      : `/work/:employeeId/:weekNumber`;
  },
};
