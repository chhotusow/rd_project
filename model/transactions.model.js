const { DataTypes, STRING } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        payable_type: { type: DataTypes.STRING, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        rdDetailId: { type: DataTypes.INTEGER, allowNull: false },
        walletId: { type: DataTypes.INTEGER, allowNull: true },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        month: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: true },
        confirmed: { type: DataTypes.DECIMAL, allowNull: true },
        meta: { type: DataTypes.STRING, allowNull: true },
        uuid: { type: DataTypes.STRING, allowNull: true }
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
    return sequelize.define('Transaction', attributes, options);
}