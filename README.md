# Employee Management

- Node.js has been used for the backend
- React.js for the frontend
- MySQL for the database
- REST API for cross platform connectivity

## Install

1. Clone this project using `git clone`
2. Create a database named `nodejs_employee_management` using `CREATE DATABASE nodejs_employee_management;`
3. To import the provided database run `mysql -u username -p nodejs_employee_management < dbexport.sql`
   - `username` is the username you can log in to the database with
   - `nodejs_employee_management` is the name of the freshly created database
   - `dbexport.sql` is the data dump file to be imported, which is located in `database` directory
4. Open `frontend` and `backend` in two seperate terminals
5. Run `npm i` in both the terminals
6. Run `npm start` in both the terminals
7. React app will open in `http://localhost:3000/
