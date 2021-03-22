const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const userService = require('../services/user.service');
const documentService = require('../services/document.service');
const planService = require('../services/plan.service');
const rd_DetailService = require('../services/rd_Details.service');
const transactionService = require('../services/transaction.service');
const walletService = require('../services/wallet.service');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const { onError } = require("../error/error");
// routes
router.post('/login', authenticateSchema, authenticate);//checked
router.post('/register', registerSchema, register);//checked
router.post('/verifyOtp', verifyOtpSchema, verifyOtp);//checked
router.get('/approveStatus/:id', authorize(), approveMyAdviserAndCustomer)//checked
router.get('/getCustomers', authorize(), getCustomers);//checked
router.get('/getActiveCustomers', authorize(), getActiveCustomers)//checked 
router.get('/getDeactivateCustomers', authorize(), getDeactivateCustomers)//checked
router.get('/getAdvisers', authorize(), getAdvisers);//checked
router.get('/getActiveAdvisers', authorize(), getActiveAdvisers)//checked
router.get('/getDeactivateAdvisers', authorize(), getDeactivateAdvisers);//checked
router.post('/addCustomer', authorize(), addCustomerSchema, addCustomerByAdviser);//checked
router.post('/addAdvisers', authorize(), addUserSchema, addAdviserByAdviser);//checked
router.get('/user/:id', authorize(), getById);//checked
router.get('/viewProfile', authorize(), getMyProfile)//checked
router.put('/user/update/:id', authorize(), updateProfileSchema, updateProfile);//checked
router.put('/logout', authorize(), logoutMe);//checked 

router.delete('/user/:id', authorize(), deleteUserById);
router.put('/user/:id', authorize(), updateProfileSchema, updateUserById);//checked

module.exports = router;

//login schema
function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        mobileNo: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}
//create advisor schema
function addUserSchema(req, res, next) {
    const schema = Joi.object({
        mobileNo: Joi.string().required(),
        name: Joi.string().required(),
        profilePic: Joi.string(),
        type: Joi.string(),
        documentImage: Joi.string(),
        email: Joi.string(),
        gender: Joi.string(),
        dob: Joi.string(),
        address: Joi.string(),
    });
    validateRequest(req, next, schema);
}
//update profile Schema
function updateProfileSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        profilePic: Joi.string(),
        type: Joi.string(),
        email: Joi.string(),
        documentImage: Joi.string(),
        gender: Joi.string(),
        dob: Joi.string(),
        address: Joi.string(),
    });
    validateRequest(req, next, schema);
}
//create customer schema
function addCustomerSchema(req, res, next) {
    const schema = Joi.object({
        mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        name: Joi.string().required(),
        profilePic: Joi.string(),
        type: Joi.string(),
        documentImage: Joi.string(),
        planId: Joi.number().required(),
        amount: Joi.number().required(),
        email: Joi.string(),
        gender: Joi.string(),
        dob: Joi.string(),
        address: Joi.string(),

    });
    validateRequest(req, next, schema);
}
//verify otp schema
function verifyOtpSchema(req, res, next) {
    const schema = Joi.object({
        otp: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}
//register joi schema
function registerSchema(req, res, next) {
    const schema = Joi.object({
        mobileNo: Joi.string().required(),
        name: Joi.string().required()
    });
    validateRequest(req, next, schema);
}



/**
 * @api {put} /api/user/:id Update adviser and customer by main adviser and admin
 * @apiName Update Adviser and Customer
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {String} name User's Name. 
 * @apiParam {String} profilePic User's profile Picture. 
 * @apiParam {String} email User's Email. 
 * @apiParam {String} type Type of Document
 * @apiParam {String} documentImage User's document image. 
 * @apiParam {String} gender User's Gender. 
 * @apiParam {String} address User's Address. 
 * @apiParam {String} dob User's Date of Birth.
 * @apiDescription  Update Adviser and Customer
 */
// update user by admin and  adviser
async function updateUserById(req, res, next) {
    try {
        let roleId = req.user.roleId
        let id = req.params.id;
        let data = req.body;
        let userId = req.user.id;
        let verifyRoleId = req.body.roleId
        if (data) {
            switch (roleId) {
                case 1:
                    if (verifyRoleId) {
                        if (verifyRoleId == 1) {
                            return res.status(400).json({
                                status: false,
                                message: "user not take admin role"
                            });
                        } else {
                            const findUser = await userService.getUserById(id);
                            if (!findUser) {
                                return res.status(404).json({
                                    status: false,
                                    message: "user not found"
                                });
                            } else {
                                const updateUser = await userService.updateUser(id, data)
                                if (updateUser) {
                                    const againFindUser = await userService.getUserById(id)
                                    return res.status(200).json({
                                        status: true,
                                        data: againFindUser
                                    });
                                } else {
                                    return res.status(403).json({
                                        status: false,
                                        message: "user not updated"
                                    });
                                }
                            }
                        }
                    } else {
                        const findUser = await userService.getUserById(id);
                        if (!findUser) {
                            return res.status(404).json({
                                status: false,
                                message: "user not found"
                            });
                        } else {
                            const updateUser = await userService.updateUser(id, data)
                            if (updateUser) {
                                const againFindUser = await userService.getUserById(id)
                                return res.status(200).json({
                                    status: true,
                                    data: againFindUser
                                });
                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "user not updated"
                                });
                            }
                        }
                    }
                case 2:
                    if (id == 1) {
                        return res.status(400).json({
                            status: false,
                            message: "not authorized to update the admin"
                        });
                    } else {
                        if (verifyRoleId) {
                            if (verifyRoleId == 1) {
                                return res.status(400).json({
                                    status: false,
                                    message: "user not take admin role"
                                });
                            } else {
                                const getUser = await userService.getSingleUserByAdvisorId(userId, id)
                                if (!getUser) {
                                    return res.status(404).json({
                                        status: false,
                                        message: "user not found in you record"
                                    });
                                } else {
                                    const updateData = await userService.updateUser(id, data);
                                    if (updateData) {
                                        const findUser = await userService.getUserById(id);
                                        return res.status(200).json({
                                            status: true,
                                            data: findUser
                                        });
                                    } else {
                                        return res.status(403).json({
                                            status: false,
                                            message: "user not updated"
                                        });
                                    }
                                }
                            }
                        } else {
                            const getUser = await userService.getSingleUserByAdvisorId(userId, id)
                            if (!getUser) {
                                return res.status(404).json({
                                    status: false,
                                    message: "user not found in you record"
                                });
                            } else {
                                const updateData = await userService.updateUser(id, data);
                                if (updateData) {
                                    const findUser = await userService.getUserById(id);
                                    return res.status(200).json({
                                        status: true,
                                        data: findUser
                                    });
                                } else {
                                    return res.status(403).json({
                                        status: false,
                                        message: "user not updated"
                                    });
                                }
                            }
                        }
                    }
                    break;
                case 3:
                    return res.status(400).json({
                        status: false,
                        message: "your are not authorized to update data from here"
                    });
                    break;
                default:
            }
        } else {
            return res.status(404).json({
                status: false,
                message: "not found any input data from you please enter your mobile number"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

// delete user by id 
async function deleteUserById(req, res, next) {
    try {
        let id = req.params.id;
        let userId = req.user.id;
        let roleId = req.user.roleId;
        switch (roleId) {
            case 1:
                const findUser = await userService.getUserById(id);
                if (findUser) {
                    const deleteUser = await userService.deleteUserById(id);
                    if (deleteUser) {
                        const getData = await userService.getAll();
                        return res.status(200).json({
                            status: true,
                            message: "data delete successfully",
                            data: getData
                        });
                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "delete no success full"
                        });
                    }
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "user not found"
                    });
                }
                break
            case 2:
                const findUserAgain = await userService.getSingleUserByAdvisorId(userId, id);
                if (findUserAgain) {
                    const deleteData = await userService.deleteUserById(id);
                    if (deleteData) {
                        const getDataUser = await userService.findCustomersByAdvisorId(userId);
                        return res.status(200).json({
                            status: true,
                            message: "data delete successfully",
                            data: getDataUser
                        });
                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "no successfully delete"
                        });
                    }

                } else {
                    return res.status(404).json({
                        status: false,
                        message: "user not found"
                    });
                }
                break;
            case 3:
                return res.status(400).json({
                    status: false,
                    message: "your are not access to delete the data"
                });
                break;
            default:
        }
    } catch (err) {
        return onError(req, res, err);
    }
}





/**
 * @api {put} /api/logout Logout for User
 * @apiName Logout User
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription  Logout User..
 */
//logout function
async function logoutMe(req, res, next) {
    let userId = req.user.id;
    try {
        const findUser = await userService.getUserById(userId);
        if (findUser) {
            let payload = {
                otp: null
            }
            const updateUser = await userService.updateUser(userId, payload);
            return res.status(200).json({
                status: true,
                message: "logout success fully"
            });
        } else {
            return res.status(403).json({
                status: false,
                message: "logout not  success fully"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}


/**
 * @api {put} /api/user/update/:id  Update Profile 
 * @apiName Update Profile 
 * @apiGroup User
  * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {String} name User's Name. 
 * @apiParam {String} profilePic User's profile Picture. 
 * @apiParam {String} email User's Email. 
 * @apiParam {String} type Type of Document
 * @apiParam {String} documentImage User's document image. 
 * @apiParam {String} gender User's Gender. 
 * @apiParam {String} address User's Address. 
 * @apiParam {String} dob User's Date of Birth.
 * @apiDescription  Update Profile ..
 */
// update profile
async function updateProfile(req, res, next) {
    let userId = req.user.id;
    let id = req.params.id;
    let roleId = req.user.roleId;
    let data = req.body;
    data.roleId = roleId
    try {
        if (data) {
            if (roleId == 1) {
                const updateProfile = await userService.updateUser(id, data);
                if (updateProfile) {
                    const findData = await userService.getUserById(id);
                    return res.status(200).json({
                        status: true,
                        data: findData
                    });
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "data not updated`"
                    });
                }
            } else {
                if (roleId == 2) {
                    if (id == userId) {
                        const updateData = await userService.updateUser(id, data);
                        if (updateData) {
                            const findMyData = await userService.getUserById(id);
                            return res.status(200).json({
                                status: true,
                                data: findMyData
                            });
                        }
                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "you can not update any advisor data"
                        });
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "you are not authorized to update your data"
                    });
                }
            }
        } else {
            return res.status(404).json({
                status: false,
                message: "not found any input data from you please enter your mobile number"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}


/**
 * @api {post} /api/login Login for User
 * @apiName Login User
 * @apiGroup A User
 * @apiParam {Number} mobileNo User's unique mobileNo. * * 
 * @apiDescription  Login User..
 */
//login
async function authenticate(req, res, next) {
    try {
        let mobileNum = req.body.mobileNo;
        const response = await userService.getUserByMobileNo(mobileNum);
        if (response) {
            if (response.statusId == 1) {
                let otp = Math.floor(100000 + Math.random() * 900000);
                let smallOtp = {
                    otp: otp
                }
                let id = response.id;
                const updateOtp = await userService.updateUser(id, smallOtp);
                if (updateOtp) {
                    const userDetail = await userService.getUserById(id);
                    if (userDetail) {
                        return res.status(200).json({
                            status: true,
                            message: 'please check your otp',
                            data: userDetail
                        });
                    }
                }
            } else {
                return res.status(403).json({
                    status: false,
                    message: 'You are not approved by admin'
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: 'you are not register in our records'
            });
        }

    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {post} /api/register Register for Adviser
 * @apiName Register Adviser
 * @apiGroup A User
 * @apiParam {Number} mobileNo User's unique mobileNo.
 * @apiParam {String} name User's unique Name. 
 * @apiDescription  Register User
 */

//register advisor
async function register(req, res, next) {
    let data = req.body;
    data.roleId = 2;
    data.statusId = 2;
    data.count = 0;
    data.rankId = 1;
    try {
        if (data && data.mobileNo) {
            const findUser = await userService.getUserByMobileNo(data.mobileNo);
            if (!findUser) {
                let otp = Math.floor(100000 + Math.random() * 900000);
                data.otp = otp;
                const registerAdviser = await userService.createUser(data);
                if (registerAdviser) {
                    return res.status(200).json({
                        status: true,
                        message: "successfully register",
                        data: registerAdviser,
                    });
                } else {
                    return res.status(403).json({
                        status: false,
                        message: "not register please try again "
                    });
                }

            } else {
                return res.status(403).json({
                    status: false,
                    message: "you are already register in our records"
                });
            }
        } else {
            return res.status(404).json({
                status: false,
                message: "not found any input data from you please enter your mobile number"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}



/**
 * @api {post} /api/verifyOtp Verification for Otp
 * @apiName Verify Otp to enter the Dashboard
 * @apiGroup A User
 * @apiParam {Number} otp User's unique otp
 * @apiDescription Verify Otp
 */
// verify otp
async function verifyOtp(req, res, next) {
    try {
        let userOtp = req.body.otp;
        if (userOtp) {
            const otpData = await userService.findOtp(userOtp);
            if (otpData) {
                const token = jwt.sign({ sub: otpData.id }, config.secret, { expiresIn: '7d' });
                return res.status(200).json({
                    status: true,
                    data: otpData,
                    Token: token,
                    message: "welcome dear"
                });
            } else {
                return res.status(400).json({ status: false, message: 'otp is wrong please try again ' });
            }
        } else {
            return res.status(404).json({
                status: false,
                message: "not found any input data from you please enter your mobile number"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/viewProfile View user Profile
 * @apiName View Own Profile
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription View own Profile of every user
 */
//view profile
async function getMyProfile(req, res, next) {
    let userId = req.user.id;
    try {
        const data = await userService.getUserById(userId);
        if (data) {
            const getDocument = await documentService.getDocumentByUserId(userId)
            return res.status(200).json({
                status: true,
                data: data,
                document: getDocument
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "please try again"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}




/**
 * @api {post} /api/addAdvisers Add new Adviser by Adviser
 * @apiName Add Advisers
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {String} name User's name
 * @apiParam {Number} mobileNo User's unique Mobile Number
 * @apiParam {String} profilePic User's profile Picture (optional)
 * @apiParam {String} email User's unique Email (optional)
 * @apiParam {String} type Type of Document
 * @apiParam {String} documentImage User's document image. 
 * @apiParam {String} gender User's Gender (optional)
 * @apiParam {String} address User's Address (optional)
 * @apiParam {String} dob User's Date of Birth (optional)
 * @apiDescription Add New Adviser
 */
//add Adviser by adviser and admin
async function addAdviserByAdviser(req, res, next) {
    let data = req.body;
    let userId = req.user.id;
    let roleId = req.user.roleId
    let rankId = req.user.rankId;
    let userCount = req.user.count;
    try {
        if (data) {
            if (roleId == 1) {
                const findUser = await userService.getUserByMobileNo(data.mobileNo);
                if (findUser) {
                    return res.status(409).json({
                        status: false,
                        message: "adviser already registered"
                    });
                } else {
                    let payload = {
                        email: data.email,
                        profilePic: data.profilePic,
                        mobileNo: data.mobileNo,
                        name: data.name,
                        createdById: userId,
                        statusId: 1,
                        gender: data.gender,
                        address: data.address,
                        dob: data.dob,
                        roleId: 2,
                        planId: 1,
                        count: 0,
                        customerCount: 0,
                        rankId: 1
                    }
                    const createUser = await userService.createUser(payload);
                    if (createUser) {
                        let payload = {
                            type: data.type,
                            documentImage: data.documentImage,
                            userId: createUser.id
                        }
                        const createDocument = await documentService.addDocument(payload)
                        return res.status(200).json({
                            status: true,
                            message: "advisor register successfully",
                            data: createUser,
                            document: createDocument
                        });
                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "advisor not added please try again!"
                        });
                    }
                }
            } else {
                if (roleId == 2) {
                    const findUser = await userService.getUserByMobileNo(data.mobileNo);
                    if (findUser) {
                        return res.status(409).json({
                            status: false,
                            message: "adviser already registered"
                        });
                    } else {
                        let payload = {
                            email: data.email,
                            profilePic: data.profilePic,
                            mobileNo: data.mobileNo,
                            name: data.name,
                            createdById: userId,
                            statusId: 2,
                            gender: data.gender,
                            address: data.address,
                            dob: data.dob,
                            roleId: 2,
                            rankId: 1,
                            count: 0,
                            customerCount: 0
                        }
                        const createUser = await userService.createUser(payload);
                        if (createUser) {
                            let payload = {
                                type: data.type,
                                documentImage: data.documentImage,
                                userId: createUser.id
                            }
                            const createDocument = await documentService.addDocument(payload)
                            if (createDocument) {
                                const getCount = await userService.getUserById(userId);
                                if (getCount.count == 10) {
                                    let rank = {
                                        rankId: getCount.rankId + 1
                                    }
                                    const updateMyProfile = await userService.updateUser(userId, rank);
                                }
                                let a = 0;
                                let b = 0;
                                let c = 0;
                                const getUser = await userService.getUserById(userId);
                                const getDocument = await documentService.getDocumentByUserId(createUser.id)
                                if (getUser && getUser.createdById) {
                                    const getAllUser = await userService.findMyActiveAdvisers(getUser.createdById);
                                    getAllUser.rows.forEach(element => {
                                        let user = element;
                                        if (element.rankId == 2) {
                                            a = a + 1
                                        }
                                        if (element.rankId == 3) {
                                            b = b + 1
                                        }
                                        if (element.rankId == 4) {
                                            c = c + 1
                                        }
                                      
                                    });
                                    if (a || b || c  >= 10) {
                                        const getUserData = await userService.getUserById(getUser.createdById);
                                        let payload = {
                                            rankId: getUserData.rankId + 1
                                        }
                                        const updateRank = await userService.updateUser(getUser.createdById, payload);
                                        const getAdv = await userService.getUserById(createUser.id);
                                        if (getAdv) {
                                            return res.status(200).json({
                                                status: true,
                                                message: "adviser added successfully",
                                                data: getAdv,
                                                document: getDocument
                                            })
                                        } else {
                                            return res.status(200).json({
                                                status: false,
                                                message: "something is wrong"
                                            })
                                        }
                                    } else {
                                        return res.status(200).json({
                                            status: true,
                                            message: "adviser added success fully",
                                            data: createUser,
                                            document: getDocument
                                        });
                                    }
                                } else {
                                    return res.status(200).json({
                                        status: true,
                                        message: "adviser added success fully",
                                        data: createUser,
                                        document: getDocument
                                    });
                                }

                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "document not  added success fully"
                                });
                            }
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "advisor not added please try again!"
                            });
                        }
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "you are not authorized"
                    })
                }
            }
        } else {
            return res.status(403).json({
                status: false,
                message: "you are not give any data"
            })
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {post} /api/addCustomer Add new Customer by Adviser
 * @apiName Add Customer
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiParam {String} name User's name
 * @apiParam {Number} mobileNo User's unique Mobile Number
 * @apiParam {Number} planId User's Plan
 * @apiParam {Number} amount User's Plan amount (for monthly pay)
 * @apiParam {String} profilePic User's profile Picture (optional)
 * @apiParam {String} email User's unique Email (optional)
 * @apiParam {String} type Type of Document
 * @apiParam {String} documentImage User's document image. 
 * @apiParam {String} gender User's Gender (optional)
 * @apiParam {String} address User's Address (optional)
 * @apiParam {String} dob User's Date of Birth (optional)
 * @apiDescription Add New Customer
 */
//add customer by adviser  and admin
async function addCustomerByAdviser(req, res, next) {
    let data = req.body;
    let roleId = req.user.roleId;
    let userId = req.user.id;
    let planId = data.planId
    try {
        if (data) {
            if (roleId == 2) {
                const findUser = await userService.getUserByMobileNo(data.mobileNo);
                if (findUser) {
                    return res.status(409).json({
                        status: false,
                        message: "customer already registered"
                    });
                } else {
                    let payload = {
                        email: data.email,
                        profilePic: data.profilePic,
                        mobileNo: data.mobileNo,
                        name: data.name,
                        createdById: userId,
                        gender: data.gender,
                        address: data.address,
                        dob: data.dob,
                        roleId: 3,
                        statusId: 2,
                    }
                    const createUser = await userService.createUser(payload);
                    let documentPayload = {
                        type: data.type,
                        documentImage: data.documentImage,
                        userId: createUser.id
                    }
                    const createDocument = await documentService.addDocument(documentPayload)
                    if (createUser && createDocument) {
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
                                userId: createUser.id,
                                planId: planId,
                                maturityDate: today,
                                maturityAmount: matureAmount,
                                totalInvestment: totalInvestment,
                                amount: data.amount,
                                interest: i + '%',
                                monthlyAmount: p,
                                interestAmount: interestAmount,
                                rdActivateStatus: 'Active',
                                completeTransactionCount: 0,
                                pendingAmount: p
                            }
                            const createRd = await rd_DetailService.createRdDetails(rdPayLoad);
                            if (createRd) {
                                const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                ];
                                const d = new Date();
                                let month = monthNames[d.getMonth()];
                                let paymentPayload = {
                                    userId: createUser.id,
                                    rdDetailId: createRd.id,
                                    amount: p,
                                    month: month,
                                    type: 'pending',
                                }
                                const createPayment = await transactionService.storeTransactions(paymentPayload);
                                const findUser = await userService.getUserById(createUser.id);
                                let walletPayload = {
                                    userId: findUser.id,
                                    balance: 0,
                                    name: createUser.name,
                                    rdId: createRd.id
                                }
                                const createWallet = await walletService.createWallets(walletPayload);
                                let walletData = {
                                    walletId: createWallet.id
                                }
                                const updatePayment = await transactionService.updateTransactionById(walletData, createPayment.id);
                                return res.status(200).json({
                                    status: true,
                                    message: "customer register successfully",
                                    data: createUser,
                                    document: createDocument,
                                    RD_Details: createRd
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

                    } else {
                        return res.status(403).json({
                            status: false,
                            message: "customer not added please try again!"
                        });
                    }
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "you are not authorized"
                });
            }
        } else {
            return res.status(403).json({
                status: false,
                message: "something is wrong please try again"
            });
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/approveStatus/:id  Activate the User
 * @apiName For Active the User
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription activate the User for Login
 */
//approve user
async function approveMyAdviserAndCustomer(req, res, next) {
    let roleId = req.user.roleId;
    let id = req.params.id;
    try {
        if (roleId == 1) {
            const getUser = await userService.getUserById(id);
            if (getUser && getUser.roleId == 2) {
                if (getUser.statusId == 2) {
                    if (getUser.createdById) {
                        let payload = {
                            statusId: 1
                        }
                        const updateStatus = await userService.updateUser(id, payload);
                        if (updateStatus[0] == 1) {
                            let getAdviser = await userService.getUserById(getUser.createdById)
                            let count = {
                                count: getAdviser.count + 1
                            }
                            const updateMyProfile = await userService.updateUser(getUser.createdById, count);
                            return res.status(200).json({
                                status: true,
                                message: "Adviser Activated Successfully"
                            })
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Adviser  not Activated"
                            })
                        }
                    } else {
                        let payload = {
                            statusId: 1
                        }
                        const updateStatus = await userService.updateUser(id, payload);
                        if (updateStatus[0] == 1) {
                            return res.status(200).json({
                                status: true,
                                message: "Adviser Activated Successfully"
                            })
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Adviser  not Activated"
                            })
                        }
                    }
                } else {
                    if (getUser.createdById) {
                        let payload = {
                            statusId: 2
                        }
                        const updateStatus = await userService.updateUser(id, payload);
                        if (updateStatus[0] == 1) {
                            let getAdviser = await userService.getUserById(getUser.createdById)
                            let count = {
                                count: getAdviser.count - 1
                            }
                            const updateMyProfile = await userService.updateUser(getUser.createdById, count);
                            return res.status(200).json({
                                status: true,
                                message: "Adviser Deactivated Successfully"
                            })
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Adviser  not Deactivated"
                            })
                        }
                    } else {
                        let payload = {
                            statusId: 2
                        }
                        const updateStatus = await userService.updateUser(id, payload);
                        if (updateStatus[0] == 1) {
                            return res.status(200).json({
                                status: true,
                                message: "Adviser Deactivated Successfully"
                            })
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Adviser  not Deactivated"
                            })
                        }
                    }
                }
            } else {
                if (getUser && getUser.roleId == 3) {
                    if (getUser.statusId == 2) {
                        if (getUser.createdById) {
                            let payload = {
                                statusId: 1
                            }
                            const updateStatus = await userService.updateUser(id, payload);
                            if (updateStatus[0] == 1) {
                                let getAdviser = await userService.getUserById(getUser.createdById)
                                let count = {
                                    customerCount: getAdviser.customerCount + 1
                                }
                                const updateMyProfile = await userService.updateUser(getUser.createdById, count);
                                return res.status(200).json({
                                    status: true,
                                    message: "Customer Activated Successfully"
                                })
                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "Customer  not Activated"
                                })
                            }
                        } else {
                            let payload = {
                                statusId: 1
                            }
                            const updateStatus = await userService.updateUser(id, payload);
                            if (updateStatus[0] == 1) {
                                return res.status(200).json({
                                    status: true,
                                    message: "Customer Activated Successfully"
                                })
                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "Customer  not Activated"
                                })
                            }
                        }
                    } else {
                        if (getUser.createdById) {
                            let payload = {
                                statusId: 2
                            }
                            const updateStatus = await userService.updateUser(id, payload);
                            if (updateStatus[0] == 1) {
                                let getAdviser = await userService.getUserById(getUser.createdById)
                                let count = {
                                    customerCount: getAdviser.customerCount - 1
                                }
                                const updateMyProfile = await userService.updateUser(getUser.createdById, count);
                                return res.status(200).json({
                                    status: true,
                                    message: "Customer Deactivated Successfully"
                                })
                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "Customer  not Deactivated"
                                })
                            }
                        } else {
                            let payload = {
                                statusId: 2
                            }
                            const updateStatus = await userService.updateUser(id, payload);
                            if (updateStatus[0] == 1) {
                                return res.status(200).json({
                                    status: true,
                                    message: "Customer Deactivated Successfully"
                                })
                            } else {
                                return res.status(403).json({
                                    status: false,
                                    message: "Customer  not Deactivated"
                                })
                            }
                        }
                    }
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "user not found"
                    })
                }
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
 * @api {get} /api/user/:id  get User By Id
 * @apiName Get User by Id
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription get single user by id
 */
// get single user by id
async function getById(req, res, next) {
    try {
        let id = req.params.id;
        let userId = req.user.id;
        let roleId = req.user.roleId;
        if (roleId == 1) {
            const userData = await userService.getUserById(id);
            if (userData) {
                const getDocument = await documentService.getDocumentByUserId(id);
                return res.status(200).json({
                    status: true,
                    data: userData,
                    document: getDocument
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "user not found"
                });
            }
        } else {
            if (roleId == 2) {
                const myData = await userService.getSingleUserByAdvisorId(userId, id);
                if (myData) {
                    const getDocument = await documentService.getDocumentByUserId(id)
                    return res.status(200).json({
                        status: true,
                        data: myData,
                        document: getDocument
                    });

                } else {
                    return res.status(404).json({
                        status: false,
                        message: "this customer not belongs to you"
                    });
                }
            } else {
                if (roleId == 3) {
                    return res.status(400).json({
                        status: false,
                        message: "you are not authorized"
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "role not available"
                    });
                }
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }

}

/**
 * @api {get} /api/getActiveAdvisers  get Active Advisers
 * @apiName Get all Active Advisers
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Active Advisers
 */
//get active advisers
async function getActiveAdvisers(req, res, next) {
    let userId = req.user.id;
    let roleId = req.user.roleId;
    try {
        if (roleId == 1) {
            const getAdvisers = await userService.getActiveAdvisers();
            if (getAdvisers) {
                return res.status(200).json({
                    status: true,
                    data: getAdvisers
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "not advisers found"
                })
            }
        } else {
            if (roleId == 2) {
                const getAdvisers = await userService.findMyActiveAdvisers(userId)
                if (getAdvisers) {
                    return res.status(200).json({
                        status: true,
                        data: getAdvisers
                    })
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "not advisers added by you"
                    })
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "you are not able to get all advisers data"
                })
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/getActiveCustomers  get Active Customers
 * @apiName Get all Active Customers 
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Active Customers 
 */
//get active customers
async function getActiveCustomers(req, res, next) {
    let userId = req.user.id;
    let roleId = req.user.roleId;
    try {
        if (roleId == 1) {
            const getCustomers = await userService.getActiveCustomer();
            if (getCustomers) {
                return res.status(200).json({
                    status: true,
                    data: getCustomers
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "not customer found"
                })
            }
        } else {
            if (roleId == 2) {
                const getCustomers = await userService.findMyActiveCustomer(userId)
                if (getCustomers) {
                    return res.status(200).json({
                        status: true,
                        data: getCustomers
                    })
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "not advisers added by you"
                    })
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "you are not able to get all advisers data"
                })
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/getDeactivateCustomers  get Deactivate Customers
 * @apiName Get all Deactivate Customers 
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Deactivate Customers 
 */
//get deactivate customers
async function getDeactivateCustomers(req, res, next) {
    let userId = req.user.id;
    let roleId = req.user.roleId;
    try {
        if (roleId == 1) {
            const getCustomers = await userService.getDeactivateCustomer();
            if (getCustomers) {
                return res.status(200).json({
                    status: true,
                    data: getCustomers
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "not advisers found"
                })
            }
        } else {
            if (roleId == 2) {
                const getCustomers = await userService.findMyDeactivateCustomer(userId)
                if (getCustomers) {
                    return res.status(200).json({
                        status: true,
                        data: getCustomers
                    })
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "not advisers added by you"
                    })
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "you are not able to get all advisers data"
                })
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }
}
/**
 * @api {get} /api/getDeactivateAdvisers  get Deactivate Advisers
 * @apiName Get all Deactivate Advisers 
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Deactivate Advisers 
 */
//get deactivate advisers
async function getDeactivateAdvisers(req, res, next) {
    let userId = req.user.id;
    let roleId = req.user.roleId;
    try {
        if (roleId == 1) {
            const getAdvisers = await userService.getDeactiveAdvisers();
            if (getAdvisers) {
                return res.status(200).json({
                    status: true,
                    data: getAdvisers
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: "not advisers found"
                })
            }
        } else {
            if (roleId == 2) {
                const getAdvisers = await userService.findMyDeactiveAdvisers(userId)
                if (getAdvisers) {
                    return res.status(200).json({
                        status: true,
                        data: getAdvisers
                    })
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "not advisers added by you"
                    })
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "you are not able to get all advisers data"
                })
            }
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/getCustomers  get Customers
 * @apiName Get all Customers
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Customers 
 */
// get all  customers
async function getCustomers(req, res, next) {
    try {
        let userId = req.user.id;
        let roleId = req.user.roleId;
        switch (roleId) {
            case 1:
                const data = await userService.getAllCustomer();
                if (data) {
                    return res.status(200).json({
                        status: true,
                        data: data,
                    });
                } else {
                    return res.status(404).json({
                        status: false, message: "customer not found"
                    });
                }
            case 2:
                const myCustomer = await userService.findCustomersByAdvisorId(userId);
                if (myCustomer) {
                    return res.status(200).json({
                        status: true,
                        data: myCustomer,
                    });
                } else {
                    return res.status(404).json({
                        status: true, message: "you not have any customers"
                    });
                }
                break;
            case 3:
                return res.status(400).json({
                    status: false,
                    message: "you are not authorized"
                });
                break;
            default:
        }
    } catch (err) {
        return onError(req, res, err);
    }
}

/**
 * @api {get} /api/getAdvisers  get Advisers
 * @apiName Get all Advisers
 * @apiGroup User
 * @apiHeader {String} Authorization Users unique access-key
 * @apiDescription Get all Advisers 
 */
//get all advisors
async function getAdvisers(req, res, next) {
    try {
        let userId = req.user.id;
        let roleId = req.user.roleId;
        switch (roleId) {
            case 1:
                const data = await userService.getAllAdviser();
                if (data) {
                    return res.status(200).json({
                        status: true,
                        data: data,
                    });
                } else {
                    return res.status(404).json({
                        status: false, message: "advisers not found"
                    });
                }
            case 2:
                const myCustomer = await userService.findAllAdviserByAdviserId(userId);
                if (myCustomer) {
                    return res.status(200).json({
                        status: true,
                        data: myCustomer,
                    });
                } else {
                    return res.status(404).json({
                        status: true, message: "you not have any advisers"
                    });
                }
                break;
            case 3:
                return res.status(400).json({
                    status: false,
                    message: "you are not authorized"
                });
                break;
            default:
        }
    } catch (err) {
        return onError(req, res, err);
    }
}