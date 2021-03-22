
const db = require('_helpers/db');

module.exports = {
    addNewPlan,
    getPlans,
    getPlanById,
    updatePlan
};

function addNewPlan(params) {
    const data = db.Plan.create(params);
    return data;
}
function updatePlan(id,params) {
    const data = db.Plan.update(params,{
        where:{id:id}
    });
    return data;
}

function getPlans() {
    const data = db.Plan.findAll();
    return data;
}
function getPlanById(id) {
    const data = db.Plan.findOne({
        where: { id: id }
    })
    return data
}