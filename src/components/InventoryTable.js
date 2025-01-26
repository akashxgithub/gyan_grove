import React from "react";

const InventoryTable = ({
  inventory,
  filter,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) => {
  const filteredItems = inventory.filter((item) =>
    filter === "all" ? true : item.category === filter
  );

  const sortedItems = [...filteredItems].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th onClick={onSort} style={{ cursor: "pointer" }}>
            Quantity {sortOrder === "asc" ? "↑" : "↓"}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => (
          <tr
            key={item.id}
            className={`${item.quantity < 10 ? "low-stock-row" : ""}`}
          >
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td className={item.quantity < 10 ? "low-stock" : ""}>
              {item.quantity}
              {item.quantity < 10 && <span className="low-stock-icon">⚠️</span>}
            </td>
            <td>
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px",  // Added space between buttons
                }}
                onClick={() => onEdit(item.id)}
              >
                Edit
              </button>

              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
