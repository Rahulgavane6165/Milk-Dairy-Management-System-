const db = require('../models');
const Collection = db.Collection;
const { Op } = require('sequelize');

exports.getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.findAll();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collections', error: error.message });
    }
};

exports.createCollection = async (req, res) => {
    try {
        const { user_id, milk_type, fat, quantity, amount } = req.body;
        const date = new Date();;
        const collection = await Collection.create({ user_id, milk_type, fat, quantity, amount, date });
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ message: 'Error creating collection', error: error.message });
    }
};

exports.getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findByPk(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collection', error: error.message });
    }
};

exports.getCollectionsByDate = async (req, res) => {
    const { date } = req.params;  // Extract the date from route params
    console.log("req for use", date,"=================")

    try {
        const collections = await Collection.findAll({ date: { [Op.eq]: new Date(date) } });

        if (collections.length === 0) {
            return res.status(404).json({ message: 'No collections found for the given date' });
        }

        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collections by date', error: error.message });
    }
};


exports.getCollectionByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const collection = await Collection.findAll({ where: { user_id } })
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collection', error: error.message });
    }
};

exports.updateCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findByPk(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        await collection.update(req.body);
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: 'Error updating collection', error: error.message });
    }
};

exports.deleteCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findByPk(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        await collection.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collection', error: error.message });
    }
};
