
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const documentService = require('../services/document.service');
const transactionService = require('../services/transaction.service');
const planService = require('../services/plan.service');
const rd_DetailService = require('../services/rd_Details.service');
const walletService = require('../services/wallet.service');
const userService = require('../services/user.service');
const { onError } = require("../error/error");

router.get('/getCustomerRdDetails', authorize(), getMyRdDetails);//checked
router.post('/addMoreRdPlan/:id', authorize(), addRdplanSchema, addRdplan);//checked
router.get('/getAllRdPlans', authorize(), getAllRdDetails);//checked
router.get('/getAllRdDetailsByCustomerId/:id', authorize(), getAllRdDetailsByCustomerId);//checked

module.exports = router;

function addRdplanSchema(req, res, next) {
    const schema = Joi.object({
        planId: Joi.number().required(),
        amount: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

/**
 * @api {get} /api/getCustomerRdDetails  Get Customer Rd Details 
 * @apiName customer get own rd details
 * @apiGroup RD Details
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription customer get own rd details
 */
async function getMyRdDetails(req, res, next) {
    let userId = req.user.id;
    try {
        const resp = await rd_DetailService.getAllRdDetailsOfCustomer(userId);
        if (resp && resp.length != 0) {
            return res.status(200).json({
                status: true,
                data: resp
            })
        } else {
            return res.status(404).json({
                message: "you have not any open rds"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {post} /api/addMoreRdPlan/:id  Add next plan to customer
 * @apiName Add new Plan to Customer
 * @apiGroup RD Details
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {Number} planId User new plan Id
 * @apiParam  {Number} amount User new amount according the plan
 * @apiDescription Add new Plan to Customer
 */
async function addRdplan(req, res, next) {
    let data = req.body;
    let roleId = req.user.roleId;
    let planId = data.planId;
    let id = req.params.id;
    let userId = req.user.id;
    try {
        if (roleId == 2) {
            const findCustomer = await userService.getSingleCustomerByAdviserId(userId, id);
            if (findCustomer) {
                const FindRd = await rd_DetailService.getRdDetailsByUserIdAndPlanId(id, planId);
                if (FindRd) {
                    return res.status(409).json({
                        status: false,
                        message: "this customer is already select this plan"
                    })
                } else {
                    const getPlan = await planService.getPlanById(planId);
                    if (getPlan) {
                        let p = data.amount;
                        let i = getPlan.interest;
                        let n = getPlan.month;
                        let planYear = getPlan.year;
                        let today = new Date();
                        let dd = String(today.getDate()).padStart(2, '0');
                        let mm = String(today.getMonth() + 1).padStart(2, '0');
                        let yyyy = today.getFullYear();
                        let maturityYear = yyyy + planYear
                        today = dd + '-' + mm + '-' + maturityYear;
                        console.log(today)
                        let e = Math.pow((1 + i / 400), n / 3);
                        let d = Math.pow((1 + i / 400), (-1 / 3));
                        let m = (p * (e - 1)) / (1 - d);
                        let matureAmount = m.toFixed(2);
                        let totalInvestment = p * n;
                        let interestAmount = (m - p * n).toFixed(2);
                        let rdPayLoad = {
                            userId: id,
                            planId: planId,
                            maturityDate: today,
                            maturityAmount: matureAmount,
                            totalInvestment: totalInvestment,
                            amount: data.amount,
                            interest: i + '%',
                            monthlyAmount: p,
                            interestAmount: interestAmount,
                            rdActivateStatus: 'Active',
                            pendingAmount: p,
                            completeTransactionCount: 0

                        }
                        const createRd = await rd_DetailService.createRdDetails(rdPayLoad);
                        if (createRd) {
                            let paymentPayload = {
                                userId: id,
                                rdDetailId: createRd.id,
                                amount: p,
                                month: mm,
                                type: 'pending',
                            }
                            const createPayment = await transactionService.storeTransactions(paymentPayload);
                            const findUser = await userService.getUserById(id);
                            let walletPayload = {
                                userId: findUser.id,
                                balance: 0,
                                name: findUser.name,
                                rdId: createRd.id
                            }
                            const createWallet = await walletService.createWallets(walletPayload);
                            let walletData = {
                                walletId: createWallet.id
                            }
                            const updatePayment = await transactionService.updateTransactionById(walletData, createPayment.id);
                            const getDocument = await documentService.getDocumentByUserId(id);
                            return res.status(200).json({
                                status: true,
                                message: "customer new RD  registered successfully",
                                data: { getDocument, createRd }
                            });
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "rd not a created"
                            });
                        }
                    } else {
                        return res.status(404).json({
                            status: false,
                            message: "no plan found"
                        });
                    }
                }

            } else {
                return res.status(403).json({
                    status: false,
                    message: "this customer is not belongs to you or not in records"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "only adviser add another plan for customer"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}


/**
 * @api {get} /api/getAllRdPlans  Get all Customers Rd Details 
 * @apiName Get all Customers Rd Details 
 * @apiGroup RD Details
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Customers Rd Details 
 */
async function getAllRdDetails(req, res, next) {
    let roleId = req.user.roleId;

    try {
        if (roleId == 1) {
            const getRdDetails = await rd_DetailService.findAllRd();
            if (getRdDetails) {
                return res.status(200).json({
                    status: true,
                    data: getRdDetails
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "no data found"
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
 * @api {get} /api/getAllRdDetailsByCustomerId/:id  Get all RdDetailsByCustomersId 
 * @apiName Get all Rd Details By CustomerId
 * @apiGroup RD Details
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Rd Details By CustomerId
 */

async function getAllRdDetailsByCustomerId(req, res, next) {
    let id = req.params.id;
    let userId = req.user.id;
    let roleId = req.user.roleId;
    try {
        if (roleId == 2) {
            const findUser = await userService.getSingleCustomerByAdviserId(userId, id);
            if (findUser) {
                const rdDetails = await rd_DetailService.getAllRdDetailsOfCustomer(id)
                if (rdDetails) {
                    return res.status(200).json({
                        status:true,
                        data:rdDetails
                    })
                }else{
                    return res.status(404).json({
                        status: false,
                        message: "this customer have no open rd"
                    })
                }
            } else {
                return res.status(404).json({
                    status: false,
                    message: "this customer not belongs to you"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "only adviser can get the data of added customer"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}