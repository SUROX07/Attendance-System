const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin : {
    type : Boolean,
    required : true
  }
});

const adminSubjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  subjects: [{
    subjectCode: {
      type: String,
      required: true
    },
    subjectName: {
      type: String,
      required: true
    }
  }
  ]
});

const adminLogin = mongoose.model('adminLogin', adminLoginSchema);
const adminSubject = mongoose.model('adminSubject', adminSubjectSchema);
module.exports = {adminLogin, adminSubject};
