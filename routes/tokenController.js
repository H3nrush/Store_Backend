const express = require('express');
const router = express.Router();
const {
    findAllTokens,
    findTokensByPk,
    createTokens,
    updateTokens,
    deleteTokens,
    findAllTokensRawSQL
} = require('../Controllers/TokensControllers');

// Routes for finding tokens
router.get('/', findAllTokens); // Get all tokens
router.get('/:id', findTokensByPk); // Find tokens by ID

// Routes for creating, updating, and deleting tokens
router.post('/', createTokens); // Create a new token
router.put('/:id', updateTokens); // Update a token by ID
router.delete('/:id', deleteTokens); // Delete a token by ID

// Route for executing raw SQL query to find tokens
router.get('/rawsql', findAllTokensRawSQL); // Find tokens using raw SQL query

module.exports = router;
