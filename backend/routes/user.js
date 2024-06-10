const express = require('express')

//controller functions
const { signupUser, loginUser } = require('../controllers/userContoller')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signp route
router.post('/signup', signupUser)

module.exports = router