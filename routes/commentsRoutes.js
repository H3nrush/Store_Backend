const express = require('express');
const router = express.Router();
const {
    findAllComments,
    findAllCommentsByPostId,
    findAllCommentsByUserIdAndPostId,
    findCommentsByPk,
    createComments,
    updateComments,
    deleteComments
} = require('../Controllers/commentsController');
const { protect , restrict } = require('../Controllers/authControllers');

// Routes for fetching comments
router.get('/', findAllComments); // Get all comments
router.get('/post/:postId', findAllCommentsByPostId); // Get comments by post ID
router.get('/user/:userId/post/:postId', findAllCommentsByUserIdAndPostId); // Get comments by user ID and post ID
router.get('/:id', findCommentsByPk); // Get comment by ID

// Routes for creating, updating, and deleting comments
router.post('/', protect, createComments); // Create a new comment
router.put('/:id', protect, updateComments); // Update a comment by ID
router.delete('/:id', protect,restrict("admin"), deleteComments); // Delete a comment by ID

module.exports = router;
