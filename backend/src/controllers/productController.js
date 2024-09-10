const db = require('../models');
const Product = db.Product;

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        // Map through products to ensure image_path is included
        const formattedProducts = products.map(product => ({ ...product.toJSON(), image_path: `${req.protocol}://${req.get('host')}/${product.image_path}` }));
        console.log("Products", formattedProducts)
        res.status(200).json({ message: 'Products retrieved successfully', products: formattedProducts });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving products', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Include image path
        const formattedProduct = { ...product.toJSON(), image_path: `${req.protocol}://${req.get('host')}${product.image_path}` };

        res.status(200).json({ message: 'Product retrieved successfully', product: formattedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving product', error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock_quantity, discount } = req.body;
        let image_path = null;

        if (req.file) {
            image_path = `/images/products/${req.file.filename}`;
        }

        const product = await Product.create({ name, description, price, category, stock_quantity, image_path, discount });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock_quantity, discount } = req.body;
        let image_path = null;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.file) {
            if (product.image_path) {
                fs.unlinkSync(path.join(__dirname, '../public/images/products', path.basename(product.image_path)));
            }
            image_path = `/images/products/${req.file.filename}`;
        } else {
            image_path = product.image_path;
        }

        await product.update({
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            category: category || product.category,
            stock_quantity: stock_quantity || product.stock_quantity,
            image_path,
            discount: discount || product.discount,
        });

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.image_path) {
            fs.unlinkSync(path.join(__dirname, '../public/images/products', path.basename(product.image_path)));
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};
