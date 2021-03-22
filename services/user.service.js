const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../_helpers/db');

module.exports = {
    // authenticate,
    createUser,
    updateUser,
    getUserById,
    deleteUserById,
    getUserByMobileNo,//login
    getSingleUserByAdvisorId,//adviser
    registerUser,
    updateStatus,
    getAllCustomer,//admin
    getAllAdviser,//admin
    findAllAdviserByAdviserId,//adviser
    findCustomersByAdvisorId,//adviser
    findOtp,
    getActiveAdvisers,//admin
    findMyActiveAdvisers,//adviser
    getDeactiveAdvisers,//admin
    findMyDeactiveAdvisers,//adviser
    getActiveCustomer,//admin
    findMyActiveCustomer,//adviser
    getDeactivateCustomer,//admin
    findMyDeactivateCustomer,//adviser
    getSingleCustomerByAdviserId
};

// async function authenticate({ mobileNo }) {
//     const user = await db.User.scope('withHash').findOne({ where: { mobileNo } });

//     const token = jwt.sign({ sub: user.id }, config.secret, { expiresInMinutes: 5 });
//     return { ...omitHash(user.get()), token };
// }




function findOtp(otp) {
    const data = db.User.findOne({
        where: { otp: otp },
        include: [{ model: db.Role }]
    })
    return data;
}
// verify otp function

function registerUser(params) {
    const data = db.User.create(params);
    return data
}

function createUser(params) {
    const myDta = db.User.create(params);
    return myDta;
}

function getAllCustomer() {
    const data = db.User.findAndCountAll({
        where: { roleId: 3 },
        include:[{model:db.Status}]
    })
    return data;
}

function getAllAdviser() {
    const data = db.User.findAndCountAll({
        where: { roleId: 2 },
        include: [{ model: db.Role }, { model: db.Rank },{model:db.Status}]
    })
    return data;
}


//get single customer
function getSingleCustomerByAdviserId(userId, id) {
    const data = db.User.findOne({
        where: {
            createdById: userId,
            id: id,
            roleId: 3
        }
    })
    return data;
}
//get active advisers
function getActiveAdvisers() {
    const data = db.User.findAndCountAll({
        where: { roleId: 2, statusId: 1 },
        include: [{ model: db.Role }]

    })
    return data;
}
//get active customers
function getActiveCustomer() {
    const data = db.User.findAndCountAll({
        where: { roleId: 3, statusId: 1 },
        include: [{ model: db.Role }]
    })
    return data;
}

//get active advisers by added adviser
function findMyActiveAdvisers(id) {
    const data = db.User.findAndCountAll({
        where: { roleId: 2, statusId: 1, createdById: id },
        include: [{ model: db.Role }]
    })
    return data;
}

//get active customers by added adviser
function findMyActiveCustomer(id) {
    const data = db.User.findAndCountAll({
        where: { roleId: 3, statusId: 1, createdById: id },
        include: [{ model: db.Role }]
    })
    return data;
}
//get deactive advisers
function getDeactiveAdvisers() {
    const data = db.User.findAndCountAll({
        where: { roleId: 2, statusId: 2 },
        include: [{ model: db.Role }]
    })
    return data;
}
//get deactive customers
function getDeactivateCustomer() {
    const data = db.User.findAndCountAll({
        where: { roleId: 3, statusId: 2 },
        include: [{ model: db.Role }]
    })
    return data;
}

//get deactive advisers by added adviser
function findMyDeactiveAdvisers(id) {
    const data = db.User.findAndCountAll({
        where: { roleId: 2, statusId: 2, createdById: id },
        include: [{ model: db.Role }]
    })
    return data;
}
//get deactive advisers by added customers
function findMyDeactivateCustomer(id) {
    const data = db.User.findAndCountAll({
        where: { roleId: 3, statusId: 2, createdById: id },
        include: [{ model: db.Role }]
    })
    return data;
}

// async function _delete(id) {
//     const user = await getUser(id);
//     await user.destroy();
// }

// helper functions


function getUserByMobileNo(data) {
    const uData = db.User.findOne({
        where: {
            mobileNo: data
        },
        include: [{ model: db.Role }]
    })
    return uData
}

function updateStatus(param, id) {
    const data = db.User.update(param, {
        where: { id: id }
    })
    return data;
}


function getUserById(id) {
    const userData = db.User.findOne({
        where: { id: id },
        include: [{ model: db.Role },{model:db.Rank}],
    })
    return userData;
}

//get all customers
function findCustomersByAdvisorId(id) {
    const data = db.User.findAndCountAll({
        where: {
            createdById: id,
            roleId: 3
        },
        include: [{ model: db.Role }]
    })
    return data;
}


//get all advisers
function findAllAdviserByAdviserId(id) {
    const data = db.User.findAndCountAll({
        where: {
            createdById: id,
            roleId: 2
        },
        include: [{ model: db.Role }]
    })
    return data
}

function getSingleUserByAdvisorId(userId, id) {
    const data = db.User.findOne({
        where: {
            createdById: userId,
            id: id
        },
        include: [{ model: db.Role }, { model: db.Status }] 
    })
    return data;
}


function deleteUserById(id) {
    const data = db.User.destroy({
        where: { id: id }
    })
    return data;
}


function updateUser(id, params) {
    const data = db.User.update(params, {
        where: {
            id: id
        }
    })
    return data;
}


function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}