import React, { useEffect, useState } from 'react';
import { addItem, fetchItems } from './dynamoService';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', description: '' });

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    getItems(); // Fetch items on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    if (!newItem.id) {
      alert('ID is required!');
      return;
    }

    try {
      await addItem(newItem);
      alert('Item added successfully!');
      setNewItem({ id: '', name: '', description: '' }); // Reset form
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item.');
    }
  };

  return (
    <div>
      <h1>DynamoDB Items</h1>
      <input
        type="text"
        name="id"
        value={newItem.id}
        onChange={handleInputChange}
        placeholder="ID"
      />
      <input
        type="text"
        name="name"
        value={newItem.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={newItem.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.ID}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
