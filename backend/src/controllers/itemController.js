// controllers/itemController.js
const itemService = require('../services/itemService');

const createItem = async (req, res) => {
    try {
        const item = await itemService.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// filter
// const getItems = async (req, res) => {
//     try {
//         const items = await itemService.getItems();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const getItems = async (req, res) => {
    try {
        const { search } = req.query;
        console.log("Search term:", search);
        const items = await itemService.getItems(search);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
};


const getItemById = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const item = await itemService.updateItem(req.params.id, req.body);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        await itemService.deleteItem(req.params.id);
        res.status(204).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};
