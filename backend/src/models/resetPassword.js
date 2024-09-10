// models/resetPassword.js

module.exports = (sequelize, Sequelize) => {
    const ResetPassword = sequelize.define('ResetPassword', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        userId: {
            type: Sequelize.UUID,
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
        tableName: 'resetpassword', // Specify the table name
    });

    // Define associations if needed
    ResetPassword.associate = models => {
        ResetPassword.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return ResetPassword;
};
