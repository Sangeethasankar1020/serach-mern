import React, { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
    const [editingItemId, setEditingItemId] = useState(null);

    const handleSave = () => {
        setEditingItemId(null);
    };

    return (
        <div className="container">
            <h1>CRUD App</h1>
            <ItemForm itemId={editingItemId} onSave={handleSave} />
            <ItemList onEdit={setEditingItemId} />
        </div>
    );
};

export default App;
