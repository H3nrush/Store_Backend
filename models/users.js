module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This username is already in use!"
      },
      validate: {
        len: {
          msg: "Your username must be between 5 and 40 characters!",
          args: [5, 40]
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This email is already in use!"
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Phone number must contain only digits"
        }
      }
    },
    userAddress: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    userNationalIdNum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userNationalInformation: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  }, {
    onDelete: 'CASCADE',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  });

  return User;
};
