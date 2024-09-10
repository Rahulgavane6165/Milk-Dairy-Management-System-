const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/models');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const salesRoutes = require('./src/routes//salesRoutes');
const collectionRoutes = require('./src/routes/collectionRoutes');
const milkpriceRoutes = require('./src/routes/milkpriceRoutes');
const emailRoutes = require('./src/routes/emailRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/milkprice', milkpriceRoutes);
app.use('/api/email', emailRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
