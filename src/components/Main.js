import React, { useState, useEffect } from 'react';
import './Main.css';
import { MdDeleteForever } from "react-icons/md";

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const createCard = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <div className='container'>
      <div className='main'>
        <h1>Grocery Bud</h1>
        <div className='form-section'>
          <input
            type='text'
            className='text-feild'
            value={inputValue}
            onChange={handleChange}
          />
          <button onClick={createCard}>Add Item</button>
        </div>
        <div>
          {items.map((item, index) => (
            <div className='cards' key={index}>
              <div>
                <input type='checkbox' className='checkbox'></input>
                <label id='label'>{item}</label>
              </div>
              <div>
                <button onClick={() => handleDelete(index)}> <MdDeleteForever /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
