"use client";
import React, { useState, useEffect } from 'react';
import styles from '../style/add.Item.module.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newItem = { name, quantity: parseInt(quantity) };

    fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(() => {
      setName('');
      setQuantity('');
      return fetch('http://localhost:3001/items');
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error adding item:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => fetch('http://localhost:3001/items'))
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item"
          required
          className={styles.entrada}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          className={styles.entrada}
        />
        <button type="submit" className={styles.button}>Add</button>
      </form>
      <ul className={styles.ul}>
        {items.map(item => (
          <li key={item.id} className={styles.li}>
            {item.name} - {item.quantity}
            <button onClick={() => handleDelete(item.id)} className={styles.deletarButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddItem;
