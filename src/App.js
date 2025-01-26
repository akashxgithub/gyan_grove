import React, { useState } from 'react';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import FilterBar from './components/FilterBar';
import EditItemForm from './components/EditItemForm';
import './styles.css';

const App = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 15 },
    { id: 2, name: 'Desk Chair', category: 'Furniture', quantity: 8 },
  ]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (newItem) => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const itemToEdit = inventory.find((item) => item.id === id);
    setEditingItem(itemToEdit);
  };

  const saveEdit = (updatedItem) => {
    setInventory(
      inventory.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditingItem(null); // Clear editing state
  };

  const filterItems = (category) => {
    setFilter(category);
  };

  const sortItems = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const categories = [
    'all',
    ...new Set(inventory.map((item) => item.category)),
  ];

  return (
    <div className="app">
      <h1>Inventory Management</h1>
      <h2>Manage Items</h2>
      {editingItem ? (
        <EditItemForm
          currentItem={editingItem}
          onSave={saveEdit}
          onCancel={() => setEditingItem(null)}
        />
      ) : (
        <>
          <AddItemForm onAdd={addItem} />
          <FilterBar categories={categories} onFilter={filterItems} />
          <h2 className="stock-items-text">Stock Items</h2>
          <InventoryTable
            inventory={inventory}
            filter={filter}
            sortOrder={sortOrder}
            onSort={sortItems}
            onEdit={handleEdit}
            onDelete={deleteItem}
          />
        </>
      )}
    </div>
  );
};

export default App;
