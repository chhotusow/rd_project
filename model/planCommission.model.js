const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        planId: { type: DataTypes.INTEGER, allowNull: false },
        year: { type: DataTypes.INTEGER, allowNull: true },
        rankId:{type:DataTypes.INTEGER,allowNull:false},
        commissionPercent:{type:DataTypes.DECIMAL,allowNull:true}
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

    return sequelize.define('CommissonPlan', attributes, options);
}