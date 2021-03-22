const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../model/user.model')(sequelize);
    db.Role = require('../model/role.model')(sequelize);
    db.Document = require('../model/document.model')(sequelize);
    db.Plan = require('../model/plan.model')(sequelize);
    db.Rank = require('../model/rank.model')(sequelize);
    db.Status = require('../model/status.model')(sequelize);
    db.Wallet = require('../model/wallet.model')(sequelize);
    db.rd_Detail = require('../model/rd_Details.model')(sequelize);
    db.Transaction = require('../model/transactions.model')(sequelize);
    db.Commission = require('../model/comission.model')(sequelize);
    db.CommissonPlan = require('../model/planCommission.model')(sequelize);





    ///relations of tables
    db.User.belongsTo(db.Role, { foreignKey: "roleId", sourceKey: "id" });
    db.User.belongsTo(db.Status, { foreignKey: "statusId", sourceKey: "id" });
    db.Document.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
    db.User.belongsTo(db.Rank, { foreignKey: "rankId", sourceKey: "id" });
    db.Wallet.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
    db.rd_Detail.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
    db.rd_Detail.belongsTo(db.Plan, { foreignKey: "planId", sourceKey: "id" });
    db.Transaction.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
    db.Transaction.belongsTo(db.Wallet, { foreignKey: "walletId", sourceKey: "id" });
    db.Transaction.belongsTo(db.rd_Detail, { foreignKey: "rdDetailId", sourceKey: "id" });
    db.Wallet.belongsTo(db.rd_Detail, { foreignKey: "rdId", sourceKey: "id" });
    db.Commission.belongsTo(db.rd_Detail, { foreignKey: "rdId", sourceKey: "id" });
    db.Commission.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
    db.Commission.belongsTo(db.Transaction, { foreignKey: "transactionId", sourceKey: "id" });


    db.CommissonPlan.belongsTo(db.Rank, { foreignKey: "rankId", sourceKey: "id" });
    db.CommissonPlan.belongsTo(db.Plan, { foreignKey: "planId", sourceKey: "id" });

    // sync all models with database
    await sequelize.sync();
}