const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true
  },
  sem: {
    type: Number,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  sec: {
    type: String,
    required: true
  },
  attendance: [
    {
      subjectCode: {
        type: String,
        required: true
      },
      subjectName: {
        type: String,
        required: true
      },
      days_present: {
        type: Number,
        required: true
      },
      t_id: {
        type: String,
        required: true
      }
    }
  ]
});


const studentLoginSchema = new mongoose.Schema({
  student_id:{
    type: String,
    required: true,
    unique: true
  },
  name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  }
  
})

const studentRecords = mongoose.model('studentRecords', studentRecordSchema);
const studentLogin = mongoose.model('studentLogin', studentLoginSchema);
module.exports = {studentRecords, studentLogin};
