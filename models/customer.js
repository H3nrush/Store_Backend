module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      priceAmount: {
        type: DataTypes.FLOAT, // Assuming price is a floating point number
        allowNull: false,
        validate: {
          isDecimal: {
            args: [true],
            msg: 'Price amount must be a valid number.'
          },
          min: {
            args: [0],
            msg: 'Price amount must be a non-negative number.'
          }
        }
      },
      stuckTime: {
        type: DataTypes.INTEGER, // Assuming stuck time is an integer representing days
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Stuck time must be an integer.'
          },
          min: {
            args: [0],
            msg: 'Stuck time must be a non-negative integer.'
          }
        }
      }
    });
  
    return Customer;
  };
  