const express = require('express');
const router = express.Router();
const { loginAdmin, getAdmin, getStudentsBySubjectCode} = require('../controllers/adminController.js');

router.post('/login', loginAdmin);
router.get('/:admin_id', getAdmin);
router.post('/students', getStudentsBySubjectCode)

module.exports = router;
