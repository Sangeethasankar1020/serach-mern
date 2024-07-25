
import axios from 'axios';
const API_URL = 'http://localhost:3000/api/items';
// filter
// export const fetchItems = async () => {
//     const response = await fetch(API_URL);
//     return response.json();
// };



// Fetch items with search term
export const fetchItems = async (searchTerm = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: { search: searchTerm, _: new Date().getTime() }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const fetchItemById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

export const createItem = async (item) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    return response.json();
};

export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    return response.json();
};

export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
