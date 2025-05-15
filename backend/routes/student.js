const express = require('express');
const router = express.Router();
const { getAllStudents, getStudentById , incrementAttendance, registerStudent, loginStudent } = require('../controllers/studentController');

router.get('/', getAllStudents);
router.get('/:student_id', getStudentById);
router.put('/increment', incrementAttendance);
router.post('/register', registerStudent)
router.post('/login', loginStudent)

module.exports = router;
