
const db = require('_helpers/db');;

module.exports = {
    createWallets,
    updateWallet,
    getWalletByRdId
};


 function createWallets(params) {
    const data =  db.Wallet.create(params);
    return data;
}

function updateWallet(params, id) {
    const data = db.Wallet.update(params, {
        where: { id: id }
    })
    return data;
}
function getWalletByRdId(id) {
    const data = db.Wallet.findOne({
        where: { rdId: id }
    })
    return data;
}