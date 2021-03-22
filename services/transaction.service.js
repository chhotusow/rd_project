
const db = require('_helpers/db');;

module.exports = {
    getAllTransactions,
    getTransactionsByUserId,
    storeTransactions,
    updateTransactionById,
    getTransactionById,
    getLatestTransactionByRdId,
    getPendingTransactionByRdId,
    getAllPendingTransactions,
    getAllDepositTransactions,
    getTransactionsByUserIdAndRdId,
    getPendingTransactionByUserId
};


function getTransactionsByUserIdAndRdId(userId, rdId) {
    const responseData = db.Transaction.findAll({
        where: { userId: userId, rdDetailId: rdId },
        include: [{ model: db.User }, { model: db.rd_Detail }, { model: db.Wallet }]
    });
    return responseData;
}

function getAllTransactions() {
    const responseData = db.Transaction.findAndCountAll({
        include: [{ model: db.User }, { model: db.rd_Detail }, { model: db.Wallet }]
    });
    return responseData;
}

function storeTransactions(params) {
    const data = db.Transaction.create(params);
    return data;
}

function getTransactionsByUserId(id) {
    const data = db.User.findAll({
        where: { userId: id }
    });
    return data;
}



function updateTransactionById(params, id) {
    const data = db.Transaction.update(params, {
        where: { id: id }
    })
    return data;
}

function getTransactionById(id) {
    const data = db.Transaction.findOne({
        where: { id: id },
        include: [{ model: db.User }, { model: db.Wallet }, { model: db.rd_Detail }]
    })
    return data;
}

function getLatestTransactionByRdId(id) {
    const data = db.Transaction.findOne({
        where: { rdDetailId: id },
        order: [['createdAt', 'DESC']],
    });
    return data;
}

function getPendingTransactionByRdId(id) {
    const data = db.Transaction.findAll({
        where: { rdDetailId: id, type: "pending" }
    })
    return data;
}

function getAllPendingTransactions() {
    const data = db.Transaction.findAndCountAll({
        where: { type: "pending" },
        include: [{ model: db.User }, { model: db.rd_Detail }, { model: db.Wallet }]
    })
    return data;
}

async function getPendingTransactionByUserId(id) {
    const data = await db.Transaction.findAll({
        where: { type: "pending", userId: id  },
        include: [{ model: db.User }, { model: db.rd_Detail }, { model: db.Wallet }]
    })
    return data;
}

function getAllDepositTransactions() {
    const data = db.Transaction.findAndCountAll({
        where: { type: "deposit" },
        include: [{ model: db.User }, { model: db.rd_Detail }, { model: db.Wallet }]
    })
    return data;
}