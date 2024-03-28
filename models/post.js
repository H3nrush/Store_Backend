module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    subjectPost: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255], // Adjust the range as needed
          msg: "Subject must be between 1 and 255 characters long."
        }
      }
    },
    txtPost: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Text post cannot be empty."
        }
        // Add more validation rules as needed
      }
    },
    postPhoto: {
      type: DataTypes.TEXT,
      // Define appropriate validation if needed
    },
    urlPost: {
      type: DataTypes.TEXT,
      // Define appropriate validation if needed
    }
  });
};
