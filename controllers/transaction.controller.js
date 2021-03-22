const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const { onError } = require("../error/error");
const CronJob = require('cron').CronJob;

const userService = require('../services/user.service');
const walletService = require('../services/wallet.service');
const transactionService = require('../services/transaction.service');
const rdDetailsService = require('../services/rd_Details.service');
const planCommissionService = require('../services/planCommission.service');
const { response } = require('express');

// routes
router.get('/approvePayment/:id', authorize(), addPaymentOfCustomerByRdId);
router.post('/checkCronJob', cronJobForCustomerPayment);
router.get('/getTransactions', authorize(), getTransactions);
router.get('/getPendingTransactions', authorize(), getPendingTransactions);
router.get('/getDepositTransactions', authorize(), getDepositTransactions);
router.get('/getTransactionById/:id', authorize(), getTransactionById);
router.get('/getTransactionByRdIdAndUserId/:id1/:id2', authorize(), getTransactionByRdIdAndUserId);

module.exports = router;



// async function addPaymentOfCustomerByRdId(req, res, next) {
//     let data = req.body;
//     let adviserId = data.adviserId;
//     let customerId = data.customerId;
//     let RdId = data.rdId;
//     let roleId = req.user.roleId;
//     let amount = data.amount
//     try {
//         if (roleId == 1) {
//             const findUser = await userService.getSingleCustomerByAdviserId(adviserId, customerId);
//             if (findUser && findUser.statusId == 1) {
//                 const findRdDetails = await rdDetailsService.getRdDetailsById(customerId, RdId);
//                 if (findRdDetails) {
//                     if (findRdDetails.monthlyAmount == amount) {
//                         if (findRdDetails.completeTransactionCount == 0 && findRdDetails.rdActivateStatus == "Pending") {
//                             const monthNames = ["January", "February", "March", "April", "May", "June",
//                                 "July", "August", "September", "October", "November", "December"
//                             ];
//                             const d = new Date();
//                             let month = monthNames[d.getMonth()];
//                             let paymentPayload = {
//                                 userId: customerId,
//                                 rdDetailId: RdId,
//                                 amount: amount,
//                                 month: month,
//                                 type: 'deposit',
//                                 amountStatusId: '2',

//                             }
//                             const createPayment = await transactionService.storeTransactions(paymentPayload);
//                             if (createPayment) {
//                                 let status = {
//                                     rdActivateStatus: "Active"
//                                 }
//                                 const updateRdStatus = await rdDetailsService.updatePaymentRdStatus(status, RdId)
//                                 let walletPayload = {
//                                     userId: customerId,
//                                     balance: amount,
//                                     name: findUser.name,
//                                     rdId: RdId
//                                 }
//                                 const createWallet = await walletService.createWallets(walletPayload);
//                                 if (createWallet) {
//                                     let walletData = {
//                                         walletId: createWallet.id
//                                     }
//                                     const updatePayment = await transactionService.updateTransactionById(walletData, createPayment.id);
//                                     let completeTransactionCount = {
//                                         completeTransactionCount: findRdDetails.completeTransactionCount + 1
//                                     }
//                                     const updateRd = await rdDetailsService.updatePaymentRdStatus(completeTransactionCount, RdId);
//                                     const getPayments = await transactionService.getTransactionById(createPayment.id);
//                                     if (getPayments) {
//                                         return res.status(200).json({
//                                             status: true,
//                                             data: getPayments
//                                         })
//                                     } else {
//                                         return res.status(403).json({
//                                             status: false,
//                                             message: "something is happen wrong "
//                                         })
//                                     }
//                                 } else {
//                                     return res.status(403).json({
//                                         status: false,
//                                         message: "wallet data not added successfully"
//                                     })
//                                 }
//                             } else {
//                                 return res.status(403).json({
//                                     status: false,
//                                     message: "payment no deposit successfully"
//                                 })
//                             }
//                         } else {
//                             if (findRdDetails.completeTransactionCount > 0 && findRdDetails.rdActivateStatus == "Active") {
//                                 const monthNames = ["January", "February", "March", "April", "May", "June",
//                                     "July", "August", "September", "October", "November", "December"
//                                 ];
//                                 const d = new Date();
//                                 let month = monthNames[d.getMonth()];
//                                 const findLatestTransaction = await transactionService.getLatestTransactionByRdId(RdId);
//                                 if (findLatestTransaction && findLatestTransaction.month == month && type == "deposit") {
//                                     return res.status(409).json({
//                                         status: false,
//                                         message: "this customer Rd has already deposit in this month"
//                                     })
//                                 } else {
//                                     let paymentPayload = {
//                                         amount: amount,
//                                         type: 'deposit',
//                                     }
//                                     const updatePayment = await transactionService.updateTransactionById(paymentPayload, findLatestTransaction.id);
//                                     if (updatePayment[0] == 1) {
//                                         const getWallet = await walletService.getWalletByRdId(RdId);
//                                         if (getWallet && getWallet.balance) {
//                                             let walletPayload = {
//                                                 balance: parseInt(getWallet.balance) + amount
//                                             }
//                                             const updateWallet = await walletService.updateWallet(walletPayload, getWallet.id)
//                                             let completeTransactionCount = {
//                                                 completeTransactionCount: findRdDetails.completeTransactionCount + 1
//                                             }
//                                             const updateRd = await rdDetailsService.updatePaymentRdStatus(completeTransactionCount, RdId);
//                                             const getPayments = await transactionService.getTransactionById(createPayment.id);
//                                             if (getPayments) {
//                                                 return res.status(200).json({
//                                                     status: true,
//                                                     data: getPayments
//                                                 })
//                                             } else {
//                                                 return res.status(403).json({
//                                                     status: false,
//                                                     message: "something is happen wrong "
//                                                 })
//                                             }
//                                         } else {
//                                             return res.status(404).json({
//                                                 status: false,
//                                                 message: "no wallet found "
//                                             })
//                                         }
//                                     } else {
//                                         return res.status(403).json({
//                                             status: false,
//                                             message: "payment not deposit successfully"
//                                         })
//                                     }
//                                 }
//                             } else {
//                                 return res.status(404).json({
//                                     status: false,
//                                     message: "no rd Details of this customer"
//                                 })
//                             }
//                         }
//                     } else {
//                         return res.status(403).json({
//                             status: false,
//                             message: "amount not matches with your rd monthly amount"
//                         })
//                     }
//                 } else {
//                     return res.status(404).json({
//                         status: false,
//                         message: "no rd Details of this customer"
//                     })
//                 }
//             } else {
//                 return res.status(404).json({
//                     status: false,
//                     message: "Please approve the customer"
//                 })
//             }
//         } else {
//             return res.status(400).json({
//                 status: false,
//                 message: "you are not authorized to make payment of any customer"
//             })
//         }
//     } catch (err) {
//         return onError(req, res, err);
//     }
// }

/**
 * @api {get} /api/approvePayment/:id   Add payment of user with transaction Id
 * @apiName Add payment of user with transaction Id
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Add payment of user with transaction Id
 */
async function addPaymentOfCustomerByRdId(req, res, next) {
    let transactionId = req.params.id;
    let roleId = req.user.roleId
    try {
        if (roleId == 1) {
            const findTransaction = await transactionService.getTransactionById(transactionId);

            if (findTransaction && findTransaction.type == "pending") {
                let payload = {
                    type: "deposit"
                }
                const makeMyPaymentUpdate = await transactionService.updateTransactionById(payload, transactionId);
                const findTransactions = await transactionService.getTransactionById(transactionId);
                if (makeMyPaymentUpdate[0] == 1) {
                    const getRdDetails = await rdDetailsService.getRdDetailById(findTransaction.rdDetailId);
                    if (getRdDetails) {
                        let payload = {
                            pendingAmount: getRdDetails.pendingAmount - findTransactions.amount,
                            completeTransactionCount: getRdDetails.completeTransactionCount + 1
                        }
                        const updateRd = await rdDetailsService.updatePaymentRdStatus(payload, getRdDetails.id);
                        const getWallet = await walletService.getWalletByRdId(findTransactions.walletId);
                        let balance = {
                            balance: parseInt(getWallet.balance) + findTransaction.amount
                        }
                        const updateWallet = await walletService.updateWallet(balance, getWallet.id)
                        if (updateWallet[0] == 1) {
                            const getRdDetail = await rdDetailsService.getRdDetailById(getRdDetails.id);
                            return res.status(200).json({
                                data: getRdDetail,
                                status: true
                            })
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "wallet not updated"
                            })
                        }
                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "no rd  found"
                        })
                    }
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "no updated"
                    })
                }
            } else {
                return res.status(404).json({
                    status: false,
                    message: "transaction already deposit"
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
//cronJob for payment of customer
// var job = new CronJob('*  1 * * * *', function () {
//     console.log('You will see this message every second');
//     cronJobForCustomerPayment();
// }, null, true, 'America/Los_Angeles');
// job.start();
/**
 * @api {post} /api/checkCronJob   Start cron job
 * @apiName Start cron job
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Start cron job
 */
async function cronJobForCustomerPayment(req, res, next) {
    try {
        const getAllRdDetail = await rdDetailsService.getAllRdDetails();
        if (getAllRdDetail) {
            for (let i = 0; i < getAllRdDetail.length; i++) {
                const element = getAllRdDetail[i];
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const d = new Date();
                let month = monthNames[d.getMonth()];
                if (element.completeTransactionCount == null) {
                    let paymentPayload = {
                        userId: element.userId,
                        rdDetailId: element.id,
                        amount: element.monthlyAmount,
                        month: month,
                        type: 'pending',
                    }
                    const createPayment = await transactionService.storeTransactions(paymentPayload);
                    const findUser = await userService.getUserById(element.userId);
                    let walletPayload = {
                        userId: element.userId,
                        balance: 0,
                        name: findUser.name,
                        rdId: element.id
                    }
                    const createWallet = await walletService.createWallets(walletPayload);
                    let walletData = {
                        walletId: createWallet.id
                    }
                    const updatePayment = await transactionService.updateTransactionById(walletData, createPayment.id);
                    let completeTransactionCount = {
                        completeTransactionCount: 0,
                        pendingAmount: element.pendingAmount + parseInt(element.monthlyAmount)
                    }
                    const updateRd = await rdDetailsService.updatePaymentRdStatus(completeTransactionCount, element.id);
                } else {
                    const getWallet = await walletService.getWalletByRdId(element.id);
                    let paymentPayload = {
                        userId: element.userId,
                        rdDetailId: element.id,
                        amount: element.monthlyAmount,
                        month: month,
                        type: 'pending',
                        walletId: getWallet.id
                    }
                    const createPayment = await transactionService.storeTransactions(paymentPayload);
                    const getPendingPayment = await transactionService.getPendingTransactionByRdId(element.id);
                    let myPayment = 0;
                    getPendingPayment.forEach(transaction => {
                        myPayment = myPayment + transaction.amount
                    });
                    let payload = {
                        pendingAmount: myPayment
                    }
                    const update = await rdDetailsService.updatePaymentRdStatus(payload, element.id);

                }

            }
            return res.status(200).json({
                status: true,
                message: "all entries added"
            })

        } else {
            return res.status(404).json({
                status: false,
                message: "no active rd found"
            })
        }

    } catch (err) {
        return onError(req, res, err);
    }
}


/**
 * @api {get} /api/getTransactions   Get transactions
 * @apiName Get all transaction
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Get all Transactions by admin
 */
async function getTransactions(req, res, next) {
    let roleId = req.user.roleId;
    try {
        if (roleId == 1) {
            const data = await transactionService.getAllTransactions();
            if (data && data.length != 0) {
                return res.status(200).json({
                    status: true,
                    data: data
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
 * @api {get} /api/getPendingTransactions   Get pending transactions
 * @apiName Get pending transactions
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Get pending transactions by admin
 */
async function getPendingTransactions(req, res, next) {
    let roleId = req.user.roleId;
    let userId = req.user.id;
    try {
        if (roleId == 1) {
            const data = await transactionService.getAllPendingTransactions();
            if (data && data.length != 0) {
                return res.status(200).json({
                    status: true,
                    data: data
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "no data found"
                })
            }
        } else {
            if (roleId == 2) {
                const getCustomers = await userService.findCustomersByAdvisorId(userId);
                if (getCustomers && getCustomers.rows.length != 0) {
                    let data = [];
                    let check = false;
                    getCustomers.rows.forEach(async (element) => {
                        let customerId = element.id;
                        data.push(customerId)
                    });
                    let Transactions = await transactionService.getPendingTransactionByUserId(data);
                    if (Transactions) {
                        return res.status(200).json({
                            status: true,
                            data: Transactions
                        });
                    } else {
                        return res.status(404).json({
                            status: false,
                            message: "no pending transactions found"
                        });
                    }

                } else {
                    return res.status(404).json({
                        status: false,
                        message: "you have no added customers"
                    })
                }
            }
            else {
                return res.status(400).json({
                    status: false,
                    message: "you are not authorized"
                })
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }
}


/**
 * @api {get} /api/getDepositTransactions   Get deposit transactions
 * @apiName Get deposit transactions
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Get deposit transactions by admin
 */
async function getDepositTransactions(req, res, next) {
    let roleId = req.user.roleId;
    try {
        if (roleId == 1) {
            const data = await transactionService.getAllDepositTransactions();
            if (data && data.length != 0) {
                return res.status(200).json({
                    status: true,
                    data: data
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
 * @api {get} /api/getTransactionById/:id   Get TransactionById
 * @apiName Get Transaction by id
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Get Transaction by id
 */
async function getTransactionById(req, res, next) {
    let roleId = req.user.roleId;
    let transactionId = req.params.id
    try {
        if (roleId == 1) {
            const data = await transactionService.getTransactionById(transactionId);
            if (data) {
                return res.status(200).json({
                    status: true,
                    data: data
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
 * @api {get} /api/getTransactionByRdIdAndUserId/:id1/id2 Get getTransactionByRdIdAndUserId
 * @apiName Get Transaction by rdId and UserId
 * @apiGroup Transaction
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Get Transaction by rdId and UserId
 */
async function getTransactionByRdIdAndUserId(req, res, next) {
    try {
        let userId = req.params.id1;
        let rdId = req.params.id2;
        let roleId = req.user.roleId;
        let id = req.user.id;
        if (roleId == 1) {
            const response = await transactionService.getTransactionsByUserIdAndRdId(userId, rdId);
            if (response.length != 0) {
                return res.status(200).json({
                    status: true,
                    data: response
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "No Transactions found"
                })
            }
        } else {
            if (roleId == 2) {
                const GetUser = await userService.getSingleCustomerByAdviserId(id, userId)
                if (GetUser) {
                    const response = await transactionService.getTransactionsByUserIdAndRdId(userId, rdId);
                    if (response.length != 0) {
                        return res.status(200).json({
                            status: true,
                            data: response
                        })
                    } else {
                        return res.status(404).json({
                            status: false,
                            message: "No Transactions found"
                        })
                    }
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "this Customer is not Belongs to you"
                    })
                }
            } else {
                const response = await transactionService.getTransactionsByUserIdAndRdId(userId, rdId);
                if (response.length != 0) {
                    return res.status(200).json({
                        status: true,
                        data: response
                    })
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "No Transactions found"
                    })
                }
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }
}



async function addPaymentOfCustomerByRdId(req, res, next) {
    let transactionId = req.params.id;
    let roleId = req.user.roleId
    try {
        if (roleId == 1) {
            const findTransaction = await transactionService.getTransactionById(transactionId);
            const findRdDetails = await rdDetailsService.getRdDetailById(findTransaction.rdDetailId);
            if (findRdDetails && findRdDetails.completeTransactionCount != findRdDetails.Plan.month) {
                if (findTransaction && findTransaction.type == "pending") {
                    let payload = {
                        type: "deposit"
                    }
                    const makeMyPaymentUpdate = await transactionService.updateTransactionById(payload, transactionId);
                    const findTransactions = await transactionService.getTransactionById(transactionId);
                    if (makeMyPaymentUpdate[0] == 1) {
                        const getRdDetails = await rdDetailsService.getRdDetailById(findTransaction.rdDetailId);
                        if (getRdDetails) {
                            let payload = {
                                pendingAmount: getRdDetails.pendingAmount - findTransactions.amount,
                                completeTransactionCount: getRdDetails.completeTransactionCount + 1
                            }
                            const updateRd = await rdDetailsService.updatePaymentRdStatus(payload, getRdDetails.id);
                            const getWallet = await walletService.getWalletByRdId(findTransactions.walletId);
                            let balance = {
                                balance: parseInt(getWallet.balance) + findTransaction.amount
                            }
                            const updateWallet = await walletService.updateWallet(balance, getWallet.id)
                            let plan1 = [];
                            let plan2 = [];
                            let plan3 = [];
                            if (updateWallet[0] == 1) {
                                const findCommissionPlans = await planCommissionService.getPlanCommissionByPlanId(findRdDetails.planId)
                                if (findCommissionPlans) {
                                    findCommissionPlans.forEach(ele => {
                                        let resp = ele;
                                        if (findRdDetails.Plan.id == 1) {
                                            if (findRdDetails.completeTransactionCount <= 12) {
                                                if (ele.year == 1) {
                                                    console.log('year is one');
                                                    //plan1.push(resp);
                                                } else {
                                                    console.log('year' + ele.year);
                                                }
                                            }
                                        }
                                    })
                                }
                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "wallet not updated"
                                })
                            }
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "no rd  found"
                            })
                        }
                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "no updated"
                        })
                    }
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "transaction already deposit"
                    })
                }
            } else {
                return res.status(409).json({
                    status: false,
                    message: "this rd already completed"
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