const express = require('express');
const getSubject = require('../controllers/subjectController.js');
const router = express.Router();
router.get('/:subjectCode', getSubject);

module.exports = router;
