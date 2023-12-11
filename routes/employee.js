const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');
router.get('/main-view', employeeController.mainView);

module.exports = router;