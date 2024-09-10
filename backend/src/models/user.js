module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: Sequelize.STRING,
        },
        adhar_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        bank_account_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ifsc_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userType: {
            type: Sequelize.ENUM('admin', 'farmer', 'vendor'),
            allowNull: false,
        },
        createdAt: { // Explicitly define createdAt column
            type: Sequelize.DATE,
            field: 'createdAt'
        },
        updatedAt: { // Explicitly define updatedAt column
            type: Sequelize.DATE,
            field: 'updatedAt'
        },
    }, {
        timestamps: true, // Enable automatic timestamps
    });

    return User;
};
