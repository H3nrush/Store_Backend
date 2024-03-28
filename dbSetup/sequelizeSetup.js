const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/users');
const RoleModel = require('../models/RoleModel');
const likesModel = require('../models/likes');
const postsModel = require('../models/post');
const commentsModel = require('../models/comments');
const customerModel = require('../models/customer');
const offersModel = require('../models/offers');
const tokenModel = require('../models/token');
const { setRoles, setUsers } = require('./setData');

// Create Sequelize instance
const sequelize = new Sequelize('h3nrush', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
}); 

// Define models
const Role = RoleModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Likes = likesModel(sequelize, DataTypes);
const Posts = postsModel(sequelize, DataTypes);
const Comments = commentsModel(sequelize, DataTypes);
const Customer = customerModel(sequelize, DataTypes);
const Offers = offersModel(sequelize, DataTypes);
const Token = tokenModel(sequelize, DataTypes);

// Define associations
Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Likes);
Likes.belongsTo(User);

Posts.hasMany(Likes);
Likes.belongsTo(Posts);

User.hasMany(Comments);
Comments.belongsTo(User);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

User.hasMany(Customer);
Customer.belongsTo(User);

Offers.hasMany(Comments);
Comments.belongsTo(Offers);

Offers.hasMany(Likes);
Likes.belongsTo(Offers);

User.hasMany(Token);
Token.belongsTo(User);

// Sync database and set initial data
sequelize.sync({ force: true })
  .then(async () => {
    await setRoles(Role);
    await setUsers(User);
  })
  .catch(error => {
    console.log(error);
  });

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Export models and sequelize instance
module.exports = { Role, User, Likes, Posts, Comments, Customer, Offers, Token, sequelize };
