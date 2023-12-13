const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');
const passport = require('passport');

router.get('/main-view',passport.checkAuthentication, employeeController.mainView);
router.post('/add-employee', passport.checkAuthentication, employeeController.addEmployee);
router.post('/create-feedback',passport.checkAuthentication, employeeController.addFeedback);
router.get('/review-list', passport.checkAuthentication, employeeController.showList);
module.exports = router;