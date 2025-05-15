const subject = require("../models/subject");

//Get Details of the Subject
const getSubject = async (req, res) => {
    try {
      const { subjectCode } = req.params;
      console.log('Received subject Code:', subjectCode);
      const subjectDetails = await subject.findOne({ subjectCode });
  
      if (subjectDetails) {
        res.json(subjectDetails);
      } else {
        console.log('Subject details not found');
        res.status(404).json({ message: 'Details of the requested subject not found' });
      }
    } catch (error) {
      console.error('Error fetching subject Details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = getSubject;