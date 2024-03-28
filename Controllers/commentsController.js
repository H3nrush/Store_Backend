const { ValidationError } = require('sequelize');
const { Comments, User } = require('../dbSetup/sequelizeSetup');

const findAllComments = (req, res) => {
    Comments.findAll({ include: User })
        .then(comments => {
            res.json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const findAllCommentsByPostId = (req, res) => {
    const postId = req.params.postId;

    Comments.findAll({
        where: { postId: postId },
        include: User,
        order: [['createdAt', 'DESC']]
    })
        .then(comments => {
            res.json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const findAllCommentsByUserIdAndPostId = (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    Comments.findAll({
        where: { userId: userId, postId: postId },
        include: User,
        order: [['createdAt', 'DESC']]
    })
        .then(comments => {
            res.json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const findCommentsByPk = (req, res) => {
    const commentId = req.params.id;

    Comments.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: `Comment not found.` });
            }
            res.json(comment);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const createComments = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `User not found.` });
            }
            return Comments.create({ ...req.body, userId: user.id })
                .then(comment => {
                    res.json({ message: `Comment created.`, data: comment });
                });
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        });
};

const updateComments = (req, res) => {
    const commentId = req.params.id;

    Comments.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: `Comment not found.` });
            }
            return comment.update(req.body)
                .then(updatedComment => {
                    res.json({ message: `Comment updated.`, data: updatedComment });
                });
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        });
};

const deleteComments = (req, res) => {
    const commentId = req.params.id;

    Comments.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: `Comment not found.` });
            }
            return comment.destroy()
                .then(() => {
                    res.json({ message: `Comment deleted.` });
                });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

module.exports = {
    findAllComments,
    findAllCommentsByPostId,
    findAllCommentsByUserIdAndPostId,
    findCommentsByPk,
    createComments,
    updateComments,
    deleteComments
};
