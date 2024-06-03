"use client";

import React, { useEffect, useState } from 'react';


const ShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h2>Lista de Compras</h2>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles['list-item']}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default itemLista;
