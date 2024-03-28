const { ValidationError } = require('sequelize')
const { Post, User } = require('../dbSetup/sequelizeSetup')

const findAllPost = (req, res) => {
    Post.findAll({ include: User })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}
const findAllComment = (req, res) => {
    const PostId = req.params.PostId; // Assuming PostId is part of the route parameters

    Post.findAll({
        where: { PostId: PostId },
        include: User,
        order: [['createdAt', 'DESC']] // Order by createdAt in descending order
    })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
};

const findPostByPk = (req, res) => {
    return res.json({ message: `find by pk`})
}

const createPost = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `user not found.` })
            }
            return Post.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `comment is created .`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

const updatePost = (req, res) => {
    Post.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'commented.', data: result })
                    })
            } else {
                res.status(404).json({ message: `comment was not found.` })
            }
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'an error from server.', data: error.message })
        })
}

const deletePost = (req, res) => {
    Post.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ message: `comment is deleted .!`, data: result })
                    })
            } else {
                res.status(404).json({ message: `comment was not found.` }) 
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `did not find the information .`, data: error.message })
        })
}

module.exports = { findAllPost, findPostByPk, createPost, updatePost, deletePost, findAllComment } 