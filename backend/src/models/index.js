const { Sequelize } = require('sequelize');
const config = require('../config/config');

// Initialize Sequelize
const sequelize = new Sequelize(config.development);

const db = {
    Sequelize,
    sequelize,
    User: require('./user')(sequelize, Sequelize),
    Product: require('./product')(sequelize, Sequelize),
    SalesData: require('./salesData')(sequelize, Sequelize),
    Collection: require('./collection')(sequelize, Sequelize),
    MilkPrice: require('./milkprice')(sequelize, Sequelize),
    ResetPassword: require('./resetPassword')(sequelize, Sequelize),
};

// Define associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
