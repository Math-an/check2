const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// GET all users
router.get('/', protect, userController.getAllUsers);

// GET a specific user by ID
router.get('/:id', protect, userController.getUserById);

// CREATE a new user
router.post('/', userController.createUser);

router.patch('/:id', protect, userController.updateUser);

router.delete('/:id', protect, userController.deleteUser);

module.exports = router;