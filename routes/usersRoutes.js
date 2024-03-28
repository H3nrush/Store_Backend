const express = require('express');
const router = express.Router();
const {
    findAllUsers,
    findUserByPk,
    createUser,
    updateUser,
    deleteUser
} = require('../Controllers/UserControllers');
const { protect, restrict } = require('../Controllers/authControllers');

// Routes for finding users
router.get('/', protect, restrict("admin"), findAllUsers); // Get all users
router.get('/:id', protect, findUserByPk); // Find user by ID

// Routes for creating, updating, and deleting users
router.post('/', createUser); // Create a new user
router.put('/:id', protect, restrict("admin"), updateUser); // Update a user by ID
router.delete('/:id', protect, restrict("admin"), deleteUser); // Delete a user by ID

module.exports = router;
