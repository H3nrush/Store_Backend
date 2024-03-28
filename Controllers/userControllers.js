const { User } = require('../dbSetup/sequelizeSetup');
const { UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const findAllUsers = (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } }) // Exclude password from response
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const findUserByPk = (req, res) => {
    User.findByPk(parseInt(req.params.id))
        .then(result => {
            if (result) {
                res.json({ message: 'User found by given id.', data: result });
            } else {
                res.status(404).json({ message: `User not found by given id.` });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error from server.', data: error.message });
        });
};

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ ...req.body, password: hashedPassword });
        newUser.password = ""; // Remove password from response
        res.status(201).json({ message: `User created!`, data: newUser });
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: `User not created!`, data: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        if (req.body.RoleId !== undefined) {
            req.body.RoleId = parseInt(req.body.RoleId, 10);
            const validRoles = [1, 2, 3];
            if (!validRoles.includes(req.body.RoleId)) {
                return res.status(400).json({ message: "Invalid RoleId" });
            }
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await result.update(req.body);
        res.status(201).json({ message: "User updated!", data: result });
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error.", data: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        await result.destroy();
        res.json({ message: `User deleted successfully!` });
    } catch (error) {
        res.status(500).json({ message: `The request was not successful.`, data: error.message });
    }
};

module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser };
