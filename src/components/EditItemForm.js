import React, { useState, useEffect } from "react";
import "./EditItemForm.css";

const EditItemForm = ({ currentItem, onSave, onCancel }) => {
  const [item, setItem] = useState(currentItem);

  useEffect(() => {
    setItem(currentItem);
  }, [currentItem]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!item.name.trim() || !item.category.trim()) {
      alert("Name and category cannot be empty.");
      return;
    }
    onSave(item); // Save the edited item
  };

  return (
    <form onSubmit={handleSave} className="edit-form">
      <h2>Edit Item</h2>
      <div className="form-group">
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          id="name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={item.quantity}
          onChange={(e) =>
            setItem({ ...item, quantity: parseInt(e.target.value) || 0 })
          }
        />
      </div>
      <div className="form-buttons">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditItemForm;
