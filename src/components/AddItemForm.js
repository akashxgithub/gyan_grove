import React, { useState } from "react";

const AddItemForm = ({ onAdd }) => {
  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.category && item.quantity) {
      onAdd({ ...item, quantity: parseInt(item.quantity) });
      setItem({ name: "", category: "", quantity: "" });
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setItem((prevItem) => ({
      ...prevItem,
      [name]: name === "quantity" ? value.replace(/^0+/, "") : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={item.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={item.category}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={item.quantity}
        onChange={handleChange}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
