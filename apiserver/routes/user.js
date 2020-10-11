const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/sign-up', userController.postSignUp);
router.post('/sign-in', userController.postSignIn);
router.post('/sign-out', userController.postSignOut);

module.exports = router;
