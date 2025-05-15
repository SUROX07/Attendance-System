const {studentRecords, studentLogin} = require('../models/student');

const getAllStudents = async (req, res) => {
  try {
    const students = await studentRecords.find();
    // console.log("students found: ", students);
    res.json(students);
  } catch (error) {
    console.error("Error in getAllStudents:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Get attendance record of a particular student
const getStudentById = async (req, res) => {
  try {
    const { student_id } = req.params;
    console.log('Received student_id:', student_id);
    const student = await studentRecords.findOne({ student_id });

    if (student) {
      res.json(student);
    } else {
      console.log('Student not found');
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//register student on website
const registerStudent = async (req, res) => {
  let { student_id, name, email, password } = req.body;
  console.log("registerStudent body: ",req.body);
  console.log(student_id);
  try {
    const existingStudent = await studentLogin.findOne({ student_id });
    if (existingStudent) {
      return res.status(400).json({ message: 'You are already registered' });
    }
    const newStudent = new studentLogin({
      student_id:student_id,
      name:name,
      email:email,
      password:password
    });
    await newStudent.save();
    res.status(200).json({ message: 'Registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//Student login on the website
const loginStudent = async (req, res) => {
  try {
    const { student_id, password } = req.body;
    console.log(student_id, password);
    const studentData = await studentLogin.findOne({ student_id });
    if (studentData && password === studentData.password) {
      res.status(200).json({ message: 'Login successful', student: studentData });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error in loginStudent:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





//get attendance record of all the students
const incrementAttendance = async (req, res) => {
  console.log("Request body: ", req.body);
  const { student_id, subjectCode } = req.body;
  console.log(student_id)
  try {
    const student = await studentRecords.findOneAndUpdate(
      {
        student_id,
        "attendance.subjectCode": subjectCode
      },
      {
        $inc: { "attendance.$.days_present": 1 }
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student or subject not found' });
    }

    res.json({
      message: `Attendance incremented for ${subjectCode}`,
      updatedAttendance: student.attendance
    });

  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: error.message });
  }
};






module.exports = { getAllStudents, getStudentById , incrementAttendance,registerStudent, loginStudent };
