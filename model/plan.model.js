const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        month: { type: DataTypes.STRING, allowNull: true },
        year: { type: DataTypes.INTEGER, allowNull: true },
        interest:{type:DataTypes.DECIMAL,allowNull:true}
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

    return sequelize.define('Plan', attributes, options);
}