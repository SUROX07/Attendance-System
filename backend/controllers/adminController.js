const {adminLogin, adminSubject} = require('../models/admin');
const { studentRecords } = require('../models/student');

const loginAdmin = async (req, res) => {
  try {
    const { id, password } = req.body;
    console.log(id, password);
    const adminData = await adminLogin.findOne({ id });
    if (adminData && password === adminData.password) {
      res.status(200).json({ message: 'Login successful', admin: adminData });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { admin_id } = req.params;
    console.log('Received admin_id:', admin_id, typeof admin_id);
    const admin = await adminSubject.findOne({id: admin_id });

    if (admin) {
      res.json(admin);
    } else {
      console.log('Admin records not found');
      res.status(404).json({ message: 'Admin records not found' });
    }
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const getStudentsBySubjectCode = async (req, res) => {
  try {
    const { subjectCode } = req.body;
    console.log("getStudentsBySubjectCode initiated for ", subjectCode);

    const students = await studentRecords.find({
      "attendance.subjectCode": subjectCode,
    });
    console.log(students);
    if (!students.length) {
      return res.status(404).json({ message: "No students found for this subject" });
    }

    res.json(students);
  } catch (error) {
    console.error("Error fetching students by subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};
  

module.exports = { loginAdmin, getAdmin, getStudentsBySubjectCode};
