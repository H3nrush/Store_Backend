module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tokens', {
        amountTokens: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        benefit: {
            type: DataTypes.INTEGER,
        },

    }
    );
  }
  