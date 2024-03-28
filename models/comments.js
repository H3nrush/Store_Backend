module.exports = (sequelize, DataTypes) => {
  return sequelize.define('FeedBacks', {
  subject:{
    type: DataTypes.TEXT , 
    allowNull: false,
  },
  name:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },
  text:{
    type: DataTypes.TEXT ,
    allowNull: false ,
  },

});
}