const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { Tokens, User, sequelize } = require('../dbSetup/sequelizeSetup');

const findAllTokens = (req, res) => {
    Tokens.findAll()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const findAllTokensRawSQL = (req, res) => {
    sequelize.query("SELECT TokensName, rating FROM Tokens LEFT JOIN reviews ON Tokens.id = reviews.TokensId", { type: QueryTypes.SELECT })
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const findTokensByPk = (req, res) => {
    Tokens.findByPk(parseInt(req.params.id))
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: `Tokens not found.` });
            }
            res.json({ message: 'Tokens found.', data: result });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error from server.', data: error.message });
        });
};

const createTokens = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.username } });
        if (!user) {
            return res.status(404).json({ message: `User not found.` });
        }

        const newTokens = { ...req.body, UserId: user.id };
        const createdTokens = await Tokens.create(newTokens);

        res.status(201).json({ message: 'Tokens posted.', data: createdTokens });
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: `Tokens not posted.`, data: error.message });
    }
};

const updateTokens = async (req, res) => {
    try {
        const result = await Tokens.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Tokens for update not found.` });
        }

        const updatedTokens = await result.update(req.body);
        res.status(200).json({ message: 'Tokens details updated.', data: updatedTokens });
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error from server.', data: error.message });
    }
};

const deleteTokens = async (req, res) => {
    try {
        const result = await Tokens.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Tokens not found.` });
        }

        await result.destroy();
        res.json({ message: `Tokens successfully deleted.` });
    } catch (error) {
        res.status(500).json({ message: `Tokens not deleted.`, data: error.message });
    }
};

module.exports = {
    findAllTokens,
    findTokensByPk,
    createTokens,
    updateTokens,
    deleteTokens,
    findAllTokensRawSQL
};
