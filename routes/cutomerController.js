const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('../Controllers/CustomerControllers');

// Routes for creating, fetching, updating, and deleting customers
router.post('/', createCustomer); // Create a new customer
router.get('/', getAllCustomers); // Get all customers
router.get('/:id', getCustomerById); // Get customer by ID
router.put('/:id', updateCustomer); // Update customer by ID
router.delete('/:id', deleteCustomer); // Delete customer by ID

module.exports = router;
