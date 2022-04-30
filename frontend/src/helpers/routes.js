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
};
