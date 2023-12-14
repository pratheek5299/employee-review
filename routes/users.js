const express = require('express');

const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign-up', userController.signUp);
router.post('/create', userController.createUser);
router.get('/sign-in', userController.signIn);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userController.createSession);
router.get('/sign-out', userController.destroySession);
router.get('/change-access',passport.checkAuthentication, userController.changeAccess);
router.post('/admin-access', passport.checkAuthentication, userController.giveAdminAccess);
module.exports = router;