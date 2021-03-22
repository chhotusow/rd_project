const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.INTEGER, allowNull: true },
        amount: { type: DataTypes.DECIMAL, allowNull: true },
        customerId: { type: DataTypes.INTEGER, allowNull: true },
        transactionId: { type: DataTypes.INTEGER, allowNull: true },
        rdId: { type: DataTypes.INTEGER, allowNull: true },
    };
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('Commission', attributes, options);
}