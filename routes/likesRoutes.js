const express = require('express');
const router = express.Router();
const {
    findAlllikes,
    findlikesByUserIdAndPostId,
    createlikes,
    deletelikes
} = require('../Controllers/likesController');

// Routes for finding likes
router.get('/', findAlllikes); // Get all likes
router.get('/:UserId/:PostId', findlikesByUserIdAndPostId); // Find likes by UserID and PostID

// Routes for creating and deleting likes
router.post('/', createlikes); // Create a new like
router.delete('/:id', deletelikes); // Delete a like by ID

module.exports = router;
