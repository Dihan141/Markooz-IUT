const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getMe,getUserById,updateUserById,deleteUserById} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById)
router.route('/login/').post(loginUser)
router.get('/me/', protect,getMe)
module.exports = router