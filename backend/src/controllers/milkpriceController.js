const db = require('../models');
const MilkPrice = db.MilkPrice;

exports.getAllMilkPrices = async (req, res) => {
    try {
        const milkPrices = await MilkPrice.findAll();
        res.status(200).json(milkPrices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching milk prices', error: error.message });
    }
};

exports.createMilkPrice = async (req, res) => {
    try {
        const { fat, price, milk_type } = req.body;
        const milkPrice = await MilkPrice.create({ fat, price, milk_type });
        res.status(201).json(milkPrice);
    } catch (error) {
        res.status(500).json({ message: 'Error creating milk price', error: error.message });
    }
};

exports.getMilkPriceById = async (req, res) => {
    try {
        const milkPrice = await MilkPrice.findByPk(req.params.id);
        if (!milkPrice) {
            return res.status(404).json({ message: 'Milk price not found' });
        }
        res.status(200).json(milkPrice);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching milk price', error: error.message });
    }
};

exports.getMilkPriceByFatId = async (req, res) => {
    try {
        const { fat } = req.params; 
        const { milk_type } = req.query;
        console.log("milk_type", milk_type)
        const milkPrice = await MilkPrice.findOne({ where: { fat, milk_type } });
        if (!milkPrice) {
            return res.status(404).json({ message: 'Milk price not found' });
        }
        res.status(200).json(milkPrice);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching milk price', error: error.message });
    }
};

exports.updateMilkPriceById = async (req, res) => {
    try {
        const milkPrice = await MilkPrice.findByPk(req.params.id);
        if (!milkPrice) {
            return res.status(404).json({ message: 'Milk price not found' });
        }
        await milkPrice.update(req.body);
        res.status(200).json(milkPrice);
    } catch (error) {
        res.status(500).json({ message: 'Error updating milk price', error: error.message });
    }
};

exports.deleteMilkPriceById = async (req, res) => {
    try {
        const milkPrice = await MilkPrice.findByPk(req.params.id);
        if (!milkPrice) {
            return res.status(404).json({ message: 'Milk price not found' });
        }
        await milkPrice.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting milk price', error: error.message });
    }
};
