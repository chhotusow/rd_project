const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { request } = require('express');
const model = require('../model/user.model');

module.exports = {
   getPlanCommissionByPlanId,
   getPlanCommissionsByPlanIdAndYear
};

function getPlanCommissionByPlanId(planId) {
    const data = db.CommissonPlan.findAll({
        where:{planId:planId}
    })
    return data;
}

function getPlanCommissionsByPlanIdAndYear(planId) {
    const data = db.CommissonPlan.findAll({
        where:{planId:planId}
    })
    return data;
}