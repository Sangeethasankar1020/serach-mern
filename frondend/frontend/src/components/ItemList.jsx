import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem } from '../api/itemapi';
import ItemForm from './ItemForm';

const ItemList = ({ onEdit }) => {
    const [items, setItems] = useState([]);

    // filter
    const [searchTerm,setSearchTerm]=useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItems(searchTerm);
                setItems(Array.isArray(data) ? data : []); // Ensure items is an array
            } catch (error) {
                console.error("Failed to fetch items", error);
                setItems([]); // Fallback to an empty array in case of an error
            }
        };
        fetchData();
    }, [searchTerm]); // Add searchTerm as a dependency
    

    const handleDelete = async (id) => {
        await deleteItem(id);
        setItems(items.filter(item => item._id !== id));
    };

    const handleView = (item) => {
        alert(`Name: ${item.name}\nQuantity: ${item.quantity}\nPrice: $${item.price}`);
    };


    // filter-react
    // const filterItems=items.filter(item =>
    //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )
    

    return (
        <div>
            <h2>Item List</h2>
            <input type='text' 
            placeholder='Search by name'
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}
            className='search-input'
            ></input>
            <table className="item-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {/* filter */}
                {/* {filterItems.map(item => ( */}

                {items && items.length > 0 ? (
                    items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>
                                <button className="view-button" onClick={() => handleView(item)}>View</button>
                                <button className="update-button" onClick={() => onEdit(item._id)}>Update</button>
                                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No items available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
