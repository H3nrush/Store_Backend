const express = require('express');
const router = express.Router();
const {
    findAllPost,
    findPostByPk,
    createPost,
    updatePost,
    deletePost,
    findAllComment
} = require('../Controllers/PostControllers');
const { protect , restrict} = require('../Controllers/authControllers');

// Routes for fetching posts
router.get('/', findAllPost); // Get all posts
router.get('/:id', findPostByPk); // Get post by ID
router.get('/:PostId/comments', findAllComment); // Get comments for a specific post

// Routes for creating, updating, and deleting posts
router.post('/', protect, createPost); // Create a new post
router.put('/:id', protect, updatePost); // Update a post by ID
router.delete('/:id', protect, restrict("admin"), deletePost); // Delete a post by ID

module.exports = router;
