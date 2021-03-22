const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        roleId: { type: DataTypes.INTEGER, allowNull: true },
        rankId: { type: DataTypes.INTEGER, allowNull: true },
        count: { type: DataTypes.INTEGER, allowNull: true },
        customerCount: { type: DataTypes.INTEGER, allowNull: true },
        otp: { type: DataTypes.INTEGER, allowNull: true },
        mobileNo: { type: DataTypes.STRING, allowNull: false, unique: true },
        profilePic: { type: DataTypes.STRING, allowNull: true },
        statusId: { type: DataTypes.INTEGER, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        dob: { type: DataTypes.STRING, allowNull: true },
        createdById: { type: DataTypes.INTEGER, allowNull: true },
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
    return sequelize.define('User', attributes, options);
}