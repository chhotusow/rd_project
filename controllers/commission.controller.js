const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const documentService = require('../services/document.service');
const planService = require('../services/plan.service');
const walletService = require('../services/wallet.service');
const commissionService = require('../services/commission.service');
const userService = require('../services/user.service');
const { onError } = require("../error/error");

router.get('/getCommissionByCustomerId/:id', authorize(), getCommissionByCustomerId);//checked
module.exports = router;

/**
 * @api {get} /api/getCommissionByCustomerId/:id  Get all Commission by Customer Id 
 * @apiName Get all Commission by Customer Id
 * @apiGroup Commission
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Commission by Customer Id
 */
async function getCommissionByCustomerId(req, res, next) {
    let roleId = req.user.roleId;
    let customerId = req.params.id;
    let userId = req.user.id;
    try {
        if (roleId == 2) {
            const getCustomer = await userService.getSingleCustomerByAdviserId(userId, customerId);
            if (getCustomer) {
                const getCommission = await commissionService.getAdviserCommissionsByCustomerId(customerId ,userId);
                if (getCommission) {
                    return res.status(200).json({
                        status: true,
                        data: getCommission
                    })
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "not commission by this customer"
                    })
                }
            } else {
                return res.status(404).json({
                    status: false,
                    message: "user not found"
                })
            }
        }
    }catch (err) {
        return onError(req, res, err);
    }
}