const { ValidationError } = require('sequelize')
const { likes, User } = require('../dbSetup/sequelizeSetup')

const findAlllikes = (req, res) => {
    likes.findAll({ include: User })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}
const findlikesByUserIdAndPostId = (req, res) => {
    const userId = req.params.UserId;
    const postId = req.params.PostId;

    likes.findAll({
        where: { UserId: userId, PostId: postId },
        include: User,
        order: [['createdAt', 'DESC']]
    })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
};


const createlikes = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `user not found.` })
            }
            return likes.create({ ...req.body, UserId: user.id })
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

const deletelikes = (req, res) => {
  // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
  likes.findByPk(req.params.id)
      .then((result) => {
          // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
          if (result) {
              return result.destroy()
                  // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                  .then((result) => {
                      res.json({ mesage: `the likes is successfully deleted .`, data: result })
                  })
          } else {
              // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
              res.status(404).json({ mesage: `likes was not found.` })
          }
      })
      .catch((error) => {
          // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
          res.status(500).json({ mesage: `the likes with given information was not found.`, data: error.message })
      })
}


module.exports = { findAlllikes, findlikesByPk, createlikes , deletelikes }