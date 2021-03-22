const { DataTypes, DECIMAL } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.INTEGER, allowNull: true },
        planId: { type: DataTypes.INTEGER, allowNull: true },
        planId: { type: DataTypes.INTEGER, allowNull: true },
        completeTransactionCount: { type: DataTypes.INTEGER, allowNull: true },
        maturityAmount: { type: DataTypes.DECIMAL, allowNull: true },
        totalInvestment: { type: DataTypes.DECIMAL, allowNull: true },
        monthlyAmount: { type: DataTypes.DECIMAL, allowNull: true },
        maturityDate: { type: DataTypes.STRING, allowNull: true },
        interest: { type: DataTypes.STRING, allowNull: true },
        interestAmount: { type: DataTypes.DECIMAL, allowNull: true },
        rdActivateStatus: { type: DataTypes.STRING, allowNull: false },
        pendingAmount: { type: DataTypes.INTEGER, allowNull: false },
    };
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        },
        define: {
            freezeTableName: true
        }
    };
    return sequelize.define('rd_Detail', attributes, options);
}