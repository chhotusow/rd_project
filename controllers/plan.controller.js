
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const documentService = require('../services/document.service');
const planService = require('../services/plan.service');
const walletService = require('../services/wallet.service');
const { onError } = require("../error/error");

router.get('/getPlans', authorize(), getPlans);//checked
router.post('/checkPlan', authorize(), checkPlanSchema, checkPlan);//checked
router.get('/getPlanById/:id', authorize(), getPlanById);//checked
router.post('/addPlan', authorize(), addPlanSchema, addNewPlan);//checked
router.put('/updatePlan/:id', authorize(), updatePlanById);//checked

module.exports = router;

function checkPlanSchema(req, res, next) {
    const schema = Joi.object({
        amount: Joi.string().required(),
        interest: Joi.string().required(),
        months: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function addPlanSchema(req, res, next) {
    const schema = Joi.object({
        year: Joi.string().required(),
        interest: Joi.string().required(),
        month: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

// function updatePlanSchema(req, res, next) {
//     const schema = Joi.object({
//         year: Joi.string(),
//         interest: Joi.string(),
//         month: Joi.string()
//     });
//     validateRequest(req, next, schema);
// }

/**
 * @api {get} /api/getPlans  Get All Plans
 * @apiName  Get All Plans
 * @apiGroup Plan
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get All Plans
 */
async function getPlans(req, res, next) {
    try {
        const plans = await planService.getPlans();
        if (plans) {
            return res.status(200).json({
                status: true,
                data: plans
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "no plan found"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/getPlanById/:id  Get Plan By Id
 * @apiName  Get Plan By Id
 * @apiGroup Plan
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Get Plan By Id
 */
async function getPlanById(req, res, next) {
    try {
        let id = req.params.id;
        let roleId = req.user.roleId;
        if (roleId == 1) {
            const resp = await planService.getPlanById(id);
            if (resp) {
                return res.status(200).json({
                    status: true,
                    data: resp
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "data not found"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "you are not authorized"
            })
        }

    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {post} /api/checkPlan  Test the plan interest according amount and duration of months 
 * @apiName Test the Plan
 * @apiGroup Plan
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {Number} amount  enter the amount
 * @apiParam {Number} interest  enter the interest rate
 * @apiParam {Number} month Users enter duration of months
 * @apiDescription Test the plan interest according amount and duration of months 
 */
//test the plan 
async function checkPlan(req, res, next) {
    let data = req.body;
    let p = data.amount;
    let i = data.interest;
    let n = data.months;
    try {
        if (req.user) {
            let e = Math.pow((1 + i / 400), n / 3);
            let d = Math.pow((1 + i / 400), (-1 / 3));
            let m = (p * (e - 1)) / (1 - d);
            let matureAmount = m.toFixed(2);
            let totalInvestment = p * n;
            let interestAmount = (m - p * n).toFixed(2);
            if (data) {
                return res.status(200).json({
                    message: "here is details",
                    matureAmount: matureAmount,
                    totalInvestment: totalInvestment,
                    interest: interestAmount,
                    status: true
                })
            } else {
                return res.status(403).json({
                    status: false,
                    message: "no input found from u"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "you are not authorized"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {post} /api/addPlan  Add new Plan By Admin
 * @apiName Add new Plan By Admin
 * @apiGroup Plan
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {Number} year  enter the year
 * @apiParam {Number} interest  enter the interest rate
 * @apiParam {Number} month Users enter duration of months
 * @apiDescription Add new Plan By Admin
 */
async function addNewPlan(req, res, next) {
    try {
        let data = req.body;
        let roleId = req.user.roleId;
        if (roleId == 1) {
            const createPlan = await planService.addNewPlan(data);
            if (createPlan) {
                return res.status(200).json({
                    status: true,
                    message: "plan added successfully",
                    data: createPlan
                })
            } else {
                return res.status(403).json({
                    status: false,
                    message: "plan not added successfully"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "you are not authorized"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}
/**
 * @api {put} /api/updatePlan/:id  Update Plan By Admin
 * @apiName Update Plan By Admin
 * @apiGroup Plan
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {Number} year  enter the year
 * @apiParam {Number} interest  enter the interest rate
 * @apiParam {Number} month Users enter duration of months
 * @apiDescription Update Plan By Admin
 */
async function updatePlanById(req, res, next) {
    try {
        let roleId = req.user.roleId;
        let id = req.params.id;
        let data = req.body;
        if (roleId == 1) {
            const getPlan = await planService.getPlanById(id);
            if (getPlan) {
                const updateUser = await planService.updatePlan(id, data);
                if (updateUser[0] == 1) {
                    const resp = await planService.getPlanById(id);
                    return res.status(200).json({
                        status: true,
                        message: "plan updated successfully",
                        data: resp
                    })
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "plan not updated successfully",
                        data: resp
                    })
                }
            } else {
                return res.status(404).json({
                    status: false,
                    message: "no plan found"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "you are not authorized"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}