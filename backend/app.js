const express = require('express');
const connectDB = require('./config/db');
require("dotenv").config();
const adminRoutes = require('./routes/admin.js');
const studentRoutes = require('./routes/student.js');
const subjectRoutes = require('./routes/subject.js');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT;
// console.log("env port", port);
const PORT = port || 5000;


app.use(express.json());

// Connect to database
connectDB();

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subject', subjectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
