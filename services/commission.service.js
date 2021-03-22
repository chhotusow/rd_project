const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { request } = require('express');
const model = require('../model/user.model');

module.exports = {
    createCommissionOfAdviser,
    getAdviserCommissionsByCustomerId
};

function createCommissionOfAdviser(params) {
    const data = db.Commission.create(params);
    return data
}
function getAdviserCommissionsByCustomerId(id ,userId) {
    const data = db.Commission.findAll({
        where: { customerId: id ,userId:userId}
    });
    return data;
}