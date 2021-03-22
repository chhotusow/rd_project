const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.INTEGER, allowNull: true },
        rdId: { type: DataTypes.INTEGER, allowNull: true, unique: true },
        holder_type: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        slug: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        meta: { type: DataTypes.STRING, allowNull: true },
        balance: { type: DataTypes.DECIMAL, allowNull: true },
        decimal_places: { type: DataTypes.DECIMAL, allowNull: true },
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
    return sequelize.define('Wallet', attributes, options);
}