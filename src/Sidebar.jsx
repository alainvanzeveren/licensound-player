import React from "react";

function Sidebar({ categories, selectedCategory, onSelectCategory, logoSrc }) {
  return (
    <aside style={{ marginBottom: "1rem" }}>
      <img src={logoSrc} alt="Logo" style={{ width: 120, height: "auto", marginBottom: "1rem" }} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((category) => (
          <li
            key={category}
            style={{
              fontWeight: category === selectedCategory ? "bold" : "normal",
              cursor: "pointer",
              color: category === selectedCategory ? "#f90" : "white",
              marginBottom: "0.5rem"
            }}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;