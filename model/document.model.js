const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING, allowNull: true },
        documentImage: { type: DataTypes.STRING, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: true, unique: true }
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
    return sequelize.define('Document', attributes, options);
}