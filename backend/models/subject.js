const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true
      },
    total_days:{
        type:Number,
        required:true
    },
    concluded_days:{
        type:Number,
        required:true
    }
})
const subject = mongoose.model('subject', subjectSchema);
module.exports = subject;