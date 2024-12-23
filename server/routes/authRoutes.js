const express = require('express');
const { register, login, logout, getMyProfile } = require('../controllers/authController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',register )
router.post('/login', login)
router.post('/logout', logout)

router.get('/profile',authenticateJWT,getMyProfile)


module.exports = router;