define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login for User",
    "name": "Login_User",
    "group": "A_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNo",
            "description": "<p>User's unique mobileNo. * *</p>"
          }
        ]
      }
    },
    "description": "<p>Login User..</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "A_User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Register for Adviser",
    "name": "Register_Adviser",
    "group": "A_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNo",
            "description": "<p>User's unique mobileNo.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's unique Name.</p>"
          }
        ]
      }
    },
    "description": "<p>Register User</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "A_User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/verifyOtp",
    "title": "Verification for Otp",
    "name": "Verify_Otp_to_enter_the_Dashboard",
    "group": "A_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "otp",
            "description": "<p>User's unique otp</p>"
          }
        ]
      }
    },
    "description": "<p>Verify Otp</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "A_User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/verifyOtp"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getCommissionByCustomerId/:id",
    "title": "Get all Commission by Customer Id",
    "name": "Get_all_Commission_by_Customer_Id",
    "group": "Commission",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Commission by Customer Id</p>",
    "version": "0.0.0",
    "filename": "controllers/commission.controller.js",
    "groupTitle": "Commission",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getCommissionByCustomerId/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/addPlan",
    "title": "Add new Plan By Admin",
    "name": "Add_new_Plan_By_Admin",
    "group": "Plan",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>enter the year</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "interest",
            "description": "<p>enter the interest rate</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "month",
            "description": "<p>Users enter duration of months</p>"
          }
        ]
      }
    },
    "description": "<p>Add new Plan By Admin</p>",
    "version": "0.0.0",
    "filename": "controllers/plan.controller.js",
    "groupTitle": "Plan",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/addPlan"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getPlans",
    "title": "Get All Plans",
    "name": "Get_All_Plans",
    "group": "Plan",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get All Plans</p>",
    "version": "0.0.0",
    "filename": "controllers/plan.controller.js",
    "groupTitle": "Plan",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getPlans"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getPlanById/:id",
    "title": "Get Plan By Id",
    "name": "Get_Plan_By_Id",
    "group": "Plan",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get Plan By Id</p>",
    "version": "0.0.0",
    "filename": "controllers/plan.controller.js",
    "groupTitle": "Plan",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getPlanById/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/checkPlan",
    "title": "Test the plan interest according amount and duration of months",
    "name": "Test_the_Plan",
    "group": "Plan",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>enter the amount</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "interest",
            "description": "<p>enter the interest rate</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "month",
            "description": "<p>Users enter duration of months</p>"
          }
        ]
      }
    },
    "description": "<p>Test the plan interest according amount and duration of months</p>",
    "version": "0.0.0",
    "filename": "controllers/plan.controller.js",
    "groupTitle": "Plan",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/checkPlan"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/updatePlan/:id",
    "title": "Update Plan By Admin",
    "name": "Update_Plan_By_Admin",
    "group": "Plan",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>enter the year</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "interest",
            "description": "<p>enter the interest rate</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "month",
            "description": "<p>Users enter duration of months</p>"
          }
        ]
      }
    },
    "description": "<p>Update Plan By Admin</p>",
    "version": "0.0.0",
    "filename": "controllers/plan.controller.js",
    "groupTitle": "Plan",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/updatePlan/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/addMoreRdPlan/:id",
    "title": "Add next plan to customer",
    "name": "Add_new_Plan_to_Customer",
    "group": "RD_Details",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "planId",
            "description": "<p>User new plan Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>User new amount according the plan</p>"
          }
        ]
      }
    },
    "description": "<p>Add new Plan to Customer</p>",
    "version": "0.0.0",
    "filename": "controllers/rd_Details.controller.js",
    "groupTitle": "RD_Details",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/addMoreRdPlan/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getAllRdPlans",
    "title": "Get all Customers Rd Details",
    "name": "Get_all_Customers_Rd_Details",
    "group": "RD_Details",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Customers Rd Details</p>",
    "version": "0.0.0",
    "filename": "controllers/rd_Details.controller.js",
    "groupTitle": "RD_Details",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getAllRdPlans"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getAllRdDetailsByCustomerId/:id",
    "title": "Get all RdDetailsByCustomersId",
    "name": "Get_all_Rd_Details_By_CustomerId",
    "group": "RD_Details",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Rd Details By CustomerId</p>",
    "version": "0.0.0",
    "filename": "controllers/rd_Details.controller.js",
    "groupTitle": "RD_Details",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getAllRdDetailsByCustomerId/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getCustomerRdDetails",
    "title": "Get Customer Rd Details",
    "name": "customer_get_own_rd_details",
    "group": "RD_Details",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>customer get own rd details</p>",
    "version": "0.0.0",
    "filename": "controllers/rd_Details.controller.js",
    "groupTitle": "RD_Details",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getCustomerRdDetails"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/approvePayment/:id",
    "title": "Add payment of user with transaction Id",
    "name": "Add_payment_of_user_with_transaction_Id",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Add payment of user with transaction Id</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/approvePayment/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getTransactionById/:id",
    "title": "Get TransactionById",
    "name": "Get_Transaction_by_id",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get Transaction by id</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getTransactionById/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getTransactionByRdIdAndUserId/:id1/id2",
    "title": "Get getTransactionByRdIdAndUserId",
    "name": "Get_Transaction_by_rdId_and_UserId",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get Transaction by rdId and UserId</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getTransactionByRdIdAndUserId/:id1/id2"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getTransactions",
    "title": "Get transactions",
    "name": "Get_all_transaction",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Transactions by admin</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getTransactions"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getDepositTransactions",
    "title": "Get deposit transactions",
    "name": "Get_deposit_transactions",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get deposit transactions by admin</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getDepositTransactions"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getPendingTransactions",
    "title": "Get pending transactions",
    "name": "Get_pending_transactions",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get pending transactions by admin</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getPendingTransactions"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/checkCronJob",
    "title": "Start cron job",
    "name": "Start_cron_job",
    "group": "Transaction",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Start cron job</p>",
    "version": "0.0.0",
    "filename": "controllers/transaction.controller.js",
    "groupTitle": "Transaction",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/checkCronJob"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/addAdvisers",
    "title": "Add new Adviser by Adviser",
    "name": "Add_Advisers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNo",
            "description": "<p>User's unique Mobile Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profilePic",
            "description": "<p>User's profile Picture (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's unique Email (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of Document</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentImage",
            "description": "<p>User's document image.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User's Gender (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User's Address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>User's Date of Birth (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Add New Adviser</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/addAdvisers"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/addCustomer",
    "title": "Add new Customer by Adviser",
    "name": "Add_Customer",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNo",
            "description": "<p>User's unique Mobile Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "planId",
            "description": "<p>User's Plan</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>User's Plan amount (for monthly pay)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profilePic",
            "description": "<p>User's profile Picture (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's unique Email (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of Document</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentImage",
            "description": "<p>User's document image.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User's Gender (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User's Address (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>User's Date of Birth (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>Add New Customer</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/addCustomer"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/approveStatus/:id",
    "title": "Activate the User",
    "name": "For_Active_the_User",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>activate the User for Login</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/approveStatus/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/:id",
    "title": "get User By Id",
    "name": "Get_User_by_Id",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>get single user by id</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getActiveAdvisers",
    "title": "get Active Advisers",
    "name": "Get_all_Active_Advisers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Active Advisers</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getActiveAdvisers"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getActiveCustomers",
    "title": "get Active Customers",
    "name": "Get_all_Active_Customers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Active Customers</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getActiveCustomers"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getAdvisers",
    "title": "get Advisers",
    "name": "Get_all_Advisers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Advisers</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getAdvisers"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getCustomers",
    "title": "get Customers",
    "name": "Get_all_Customers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Customers</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getCustomers"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getDeactivateAdvisers",
    "title": "get Deactivate Advisers",
    "name": "Get_all_Deactivate_Advisers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Deactivate Advisers</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getDeactivateAdvisers"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/getDeactivateCustomers",
    "title": "get Deactivate Customers",
    "name": "Get_all_Deactivate_Customers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Get all Deactivate Customers</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/getDeactivateCustomers"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/logout",
    "title": "Logout for User",
    "name": "Logout_User",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>Logout User..</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/logout"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/:id",
    "title": "Update adviser and customer by main adviser and admin",
    "name": "Update_Adviser_and_Customer",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profilePic",
            "description": "<p>User's profile Picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of Document</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentImage",
            "description": "<p>User's document image.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User's Gender.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User's Address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>User's Date of Birth.</p>"
          }
        ]
      }
    },
    "description": "<p>Update Adviser and Customer</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/user/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/update/:id",
    "title": "Update Profile",
    "name": "Update_Profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profilePic",
            "description": "<p>User's profile Picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of Document</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "documentImage",
            "description": "<p>User's document image.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User's Gender.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User's Address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>User's Date of Birth.</p>"
          }
        ]
      }
    },
    "description": "<p>Update Profile ..</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/user/update/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/viewProfile",
    "title": "View user Profile",
    "name": "View_Own_Profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "description": "<p>View own Profile of every user</p>",
    "version": "0.0.0",
    "filename": "controllers/users.controller.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/viewProfile"
      }
    ]
  }
] });
