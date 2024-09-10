const db = require('../models');
const Sale = db.SalesData;
const Product = db.Product;

exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.status(200).json({ message: 'Sales retrieved successfully', sales });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving sales', error: err.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await Sale.findByPk(id);

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale retrieved successfully', sale });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving sale', error: err.message });
    }
};

exports.getSaleByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        const sale = await Sale.findAll({
            where: { user_id }, include: [
                {
                    model: Product,
                    attributes: ['name', 'category', 'discount', 'image_path']
                }
            ]
        })
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        const formattedSalesData = sale.map(sale => {
            const product = sale.Product; // Access associated product data
            return {
                id: sale.id,
                product_id: sale.product_id,
                quantity_sold: sale.quantity_sold,
                sale_price: sale.sale_price,
                sale_date: sale.sale_date,
                product_name: product.name,
                product_category: product.category,
                product_discount: product.discount,
                product_image_path: `${req.protocol}://${req.get('host')}/${product.image_path}`
            };
        });
        console.log(formattedSalesData)

        res.status(200).json({ message: 'Sale retrieved successfully', formattedSalesData });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving sale', error: err.message });
    }
};

exports.createSale = async (req, res) => {
    try {
        const { user_id, product_id, quantity_sold, sale_price } = req.body;
        console.log(user_id, product_id, quantity_sold, sale_price, "==========================")
        // Validate if the product exists
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate if the quantity available is sufficient
        if (quantity_sold > product.stock_quantity) {
            return res.status(400).json({ message: 'Insufficient stock quantity' });
        }
        const sale_date = new Date();
        // Create the sale
        const sale = await Sale.create({ user_id, product_id, quantity_sold, sale_price, sale_date });

        // Update the product stock quantity
        await product.update({ stock_quantity: product.stock_quantity - quantity_sold });

        res.status(201).json({ message: 'Sale created successfully', sale });
    } catch (err) {
        res.status(500).json({ message: 'Error creating sale', error: err.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, product_id, quantity_sold, sale_price, sale_date } = req.body;

        const sale = await Sale.findByPk(id);

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        // If product ID is updated, validate the new product
        if (product_id && product_id !== sale.product_id) {
            const product = await Product.findByPk(product_id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Validate if the quantity available is sufficient
            if (quantity_sold > product.stock_quantity) {
                return res.status(400).json({ message: 'Insufficient stock quantity' });
            }
        }

        // Update the sale
        await sale.update({
            user_id: user_id || sale.user_id,
            product_id: product_id || sale.product_id,
            quantity_sold: quantity_sold || sale.quantity_sold,
            sale_price: sale_price || sale.sale_price,
            sale_date: sale_date || sale.sale_date,
        });

        // Update the product stock quantity
        if (product_id && product_id !== sale.product_id) {
            const oldProduct = await Product.findByPk(sale.product_id);
            await oldProduct.update({ stock_quantity: oldProduct.stock_quantity + sale.quantity_sold });

            const newProduct = await Product.findByPk(product_id);
            await newProduct.update({ stock_quantity: newProduct.stock_quantity - quantity_sold });
        }

        res.status(200).json({ message: 'Sale updated successfully', sale });
    } catch (err) {
        res.status(500).json({ message: 'Error updating sale', error: err.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findByPk(id);

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        // Update the product stock quantity
        const product = await Product.findByPk(sale.product_id);
        await product.update({ stock_quantity: product.stock_quantity + sale.quantity_sold });

        await sale.destroy();
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting sale', error: err.message });
    }
};
