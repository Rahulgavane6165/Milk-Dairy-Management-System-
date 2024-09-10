// models/product.js
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: Sequelize.ENUM('medicine', 'feed'),
            allowNull: false,
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        image_path: {
            type: Sequelize.STRING,
        },
        discount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
    Product.associate = (models) => {
        Product.hasMany(models.SalesData, { foreignKey: 'product_id' });
    };

    return Product;
};
