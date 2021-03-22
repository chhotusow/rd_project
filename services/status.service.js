const db = require('_helpers/db');

module.exports = {
    getStatus
};

function getStatus() {
    const data = db.Status.findAll();
    return data;
}