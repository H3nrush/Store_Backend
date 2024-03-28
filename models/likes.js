module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    likeAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        // Custom validation to ensure likeAmount is always 1
        isOneLike(value) {
          if (value !== 1 || value !== 0) {
            throw new Error('Like amount must be 1.');
          }
        }
      }
    },
  });

  return Likes;
};
