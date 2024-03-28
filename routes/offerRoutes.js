const express = require('express');
const router = express.Router();
const {
    createOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer
} = require('../Controllers/offerController');
const { restrict } = require('../Controllers/authControllers'); // Assuming you have middleware to check if user is admin

// Route for creating a new offer
router.post('/', restrict("admin"), createOffer);

// Route for fetching all offers
router.get('/', getAllOffers);

// Route for fetching a single offer by ID
router.get('/:id', getOfferById);

// Route for updating an existing offer by ID
router.put('/:id', restrict("admin"), updateOffer);

// Route for deleting an offer by ID
router.delete('/:id', restrict("admin"), deleteOffer);

module.exports = router;
