const { Customer } = require('../dbSetup/sequelizeSetup');

const createCustomer = (req, res) => {
    const { priceAmount, stuckTime } = req.body;

    Customer.create({ priceAmount, stuckTime })
        .then(customer => {
            res.status(201).json({ message: 'Customer created successfully.', data: customer });
        })
        .catch(error => {
            res.status(400).json({ message: error.message });
        });
};

const getAllCustomers = (req, res) => {
    Customer.findAll()
        .then(customers => {
            res.json(customers);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const getCustomerById = (req, res) => {
    const customerId = req.params.id;

    Customer.findByPk(customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }
            res.json(customer);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const updateCustomer = (req, res) => {
    const customerId = req.params.id;
    const { priceAmount, stuckTime } = req.body;

    Customer.findByPk(customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }
            return customer.update({ priceAmount, stuckTime })
                .then(updatedCustomer => {
                    res.json({ message: 'Customer updated successfully.', data: updatedCustomer });
                });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const deleteCustomer = (req, res) => {
    const customerId = req.params.id;

    Customer.findByPk(customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }
            return customer.destroy()
                .then(() => {
                    res.json({ message: 'Customer deleted successfully.' });
                });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
