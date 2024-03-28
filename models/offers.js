module.exports = (sequelize, DataTypes) => {
    const Offer = sequelize.define('Offer', {
      priceInUsdt: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            args: [true],
            msg: 'Price in USDT must be a valid floating-point number.'
          },
          min: {
            args: [0],
            msg: 'Price in USDT must be a non-negative number.'
          }
        }
      },
      priceInDollar: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            args: [true],
            msg: 'Price in dollar must be a valid floating-point number.'
          },
          min: {
            args: [0],
            msg: 'Price in dollar must be a non-negative number.'
          }
        }
      },
      timeOfStuck: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Time of stuck must be an integer.'
          },
          min: {
            args: [0],
            msg: 'Time of stuck must be a non-negative integer.'
          }
        }
      },
      offerCode: {
        type: DataTypes.INTEGER,
        defaultValue: function() {
          // Generate a random 6-digit number as the default offer code
          return Math.floor(100000 + Math.random() * 900000);
        },
        unique: true,
        allowNull: false
      }
    });
  
    return Offer;
  };
  