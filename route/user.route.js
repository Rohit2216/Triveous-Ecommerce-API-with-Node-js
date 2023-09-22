const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/user.controller');


const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/', getAllUsers);

module.exports = { userRouter };