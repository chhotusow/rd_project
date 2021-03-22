const db = require('_helpers/db');

module.exports = {
    getRdDetailsByUserId,
    getAllRdDetailsOfCustomer,
    createRdDetails,
    getRdDetailsByUserIdAndPlanId,
    updatePaymentRdStatus,
    getAllRdDetails, 
    findAllRd,
    getRdDetailById
};

function getRdDetailsByUserId(userId, id) {
    const data = db.rd_Detail.findAll({
        where: { userId: userId, id: id }
    });
    return data;
}

function getRdDetailById(id) {
    const data = db.rd_Detail.findOne({
        where: { id: id },
        include:[{model:db.Plan}]
    });
    return data;
}

function getAllRdDetailsOfCustomer(userId) {
    const data = db.rd_Detail.findAll({
        where: { userId: userId, rdActivateStatus: 'Active' },
        include: [{ model: db.User }, { model: db.Plan }]
    })
    return data;
}

function getAllRdDetails() {
    const data = db.rd_Detail.findAll({
        where:{	rdActivateStatus:"Active"}
    })
    return data;
}
function findAllRd() {
    const data = db.rd_Detail.findAll({
        include: [{ model: db.User }, { model: db.Plan }]
    })
    return data;
}

function createRdDetails(values) {
    const data = db.rd_Detail.create(values);
    return data
}

function getRdDetailsByUserIdAndPlanId(userId, planId) {
    const data = db.rd_Detail.findOne({
        where: { userId: userId, planId: planId, rdActivateStatus: 'Active' },
        include: [{ model: db.User }, { model: db.Plan }]
    })
    return data;
}

  function updatePaymentRdStatus(params, id) {
    const data =  db.rd_Detail.update(params, {
        where: { id: id }
    })
    return data
}