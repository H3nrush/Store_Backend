const { Offer } = require('../dbSetup/sequelizeSetup');

const createOffer = async (req, res) => {
    try {
        const newOffer = await Offer.create(req.body);
        res.status(201).json({ message: 'Offer created successfully.', data: newOffer });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create offer.', error: error.message });
    }
};

const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch offers.', error: error.message });
    }
};

const getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found.' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch offer.', error: error.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found.' });
        }
        await offer.update(req.body);
        res.status(200).json({ message: 'Offer updated successfully.', data: offer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update offer.', error: error.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found.' });
        }
        await offer.destroy();
        res.status(200).json({ message: 'Offer deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete offer.', error: error.message });
    }
};

module.exports = { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer };
