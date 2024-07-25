import React, { useState, useEffect } from 'react';
import { createItem, updateItem, fetchItemById } from '../api/itemapi';

const ItemForm = ({ itemId, onSave }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (itemId) {
            const fetchItem = async () => {
                const item = await fetchItemById(itemId);
                setName(item.name);
                setQuantity(item.quantity);
                setPrice(item.price);
            };
            fetchItem();
        }
    }, [itemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { name, quantity, price };

        if (itemId) {
            await updateItem(itemId, newItem);
        } else {
            await createItem(newItem);
        }

        setName('');
        setQuantity('');
        setPrice('');
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="item-form">
            <h2>{itemId ? 'Update Item' : 'Add Item'}</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <button type="submit">{itemId ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default ItemForm;
