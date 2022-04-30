const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const employeeRoutes = require('./routes/employee.routes');
const workRoutes = require('./routes/work.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/employee', employeeRoutes);

app.use('/api/work', workRoutes);

app.listen(PORT, () => {
  console.log(`App started on: ${PORT} 🚀`);
});
