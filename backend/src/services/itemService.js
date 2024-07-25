// services/itemService.js
const Item = require('../models/itemModel');

const createItem = async (itemData) => {
    const item = new Item(itemData);
    await item.save();
    return item;
};
// filter
// const getItems = async () => {
//     return await Item.find();
// };

const getItems = async (search) => {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    return await Item.find(query);
};



const getItemById = async (id) => {
    return await Item.findById(id);
};

const updateItem = async (id, itemData) => {
    return await Item.findByIdAndUpdate(id, itemData, { new: true });
};

const deleteItem = async (id) => {
    await Item.findByIdAndDelete(id);
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};
