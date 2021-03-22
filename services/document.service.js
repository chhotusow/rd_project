const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { request } = require('express');
const model = require('../model/user.model');

module.exports = {
    addDocument,
    getDocumentByUserId
};

function addDocument(data) {
    const responseData = db.Document.create(data);
    return responseData;
}
function getDocumentByUserId(id) {
    const data = db.Document.findOne({
        where: {
            userId: id
        }
    })
    return data
}