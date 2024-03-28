const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../dbSetup/sequelizeSetup');
const SECRET_KEY = require('../configs/tokenData');

const rolesHierarchy = {
  edit: ["user"],
  admin: ["admin"],
};

const login = (req, res) => {
  User.scope('withPassword').findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `User not found!` });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((isValid) => {
          if (!isValid) {
            return res.status(401).json({ message: `Invalid password!` });
          }
          const token = jwt.sign({
            data: user.username,
            RoleId: user.RoleId,
            id: user.id,
          }, SECRET_KEY, { expiresIn: '1h' }); // Set token expiration
          res.json({ message: `Login successful!`, token });
        })
        .catch((error) => {
          res.status(500).json({ message: 'Internal server error.', error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    });
};

const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `You are not authenticated.` });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.username = decoded.data;
      next();
    } catch (error) {
      return res.status(403).json({ message: `Invalid token!` });
    }
  }
};

const restrict = (roleParam) => {
  return (req, res, next) => {
    User.findOne({
      where: {
        username: req.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: `User not found.` });
        }
        Role.findByPk(user.RoleId)
          .then((role) => {
            if (!role) {
              return res.status(404).json({ message: `Role not found for user.` });
            }
            if (rolesHierarchy[role.label].includes(roleParam)) {
              next();
            } else {
              res.status(403).json({ message: `Insufficient rights.` });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
          });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
      });
  };
};

const restrictToOwnUser = (model) => {
  return (req, res, next) => {
    User.findOne({
      where: { username: req.username },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: `User not found.` });
        }
        Role.findByPk(user.RoleId)
          .then((role) => {
            if (!role) {
              return res.status(404).json({ message: `Role not found for user.` });
            }
            if (rolesHierarchy[role.label].includes("admin")) {
              return next(); // admin can perform any action
            }
            model.findByPk(req.params.id)
              .then((resource) => {
                if (!resource) {
                  return res.status(404).json({ message: `Resource not found.` });
                }
                if (user.id === resource.UserId || user.id === resource.id) {
                  next(); // User is the owner, allow the action
                } else {
                  res.status(403).json({ message: `You are not the owner.` });
                }
              })
              .catch((error) => {
                res.status(500).json({ message: 'Internal server error.', error: error.message });
              });
          })
          .catch((error) => {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
          });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
      });
  };
};

const correctUser = (req, res, next) => {
  User.findOne({ where: { username: req.username } })
    .then((authUser) => {
      if (!authUser) {
        return res.status(404).json({ message: `User not found.` });
      }
      if (authUser.id === parseInt(req.params.id)) {
        next();
      } else {
        res.status(403).json({ message: "Access Denied!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    });
};

module.exports = { login, protect, restrict, restrictToOwnUser, correctUser };
