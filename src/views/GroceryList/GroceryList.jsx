import style from './GroceryList.css';
import { useState } from 'react';
import { useGroceries } from '../../context/GroceryProvider';
import GroceryItem from '../GroceryItem/GroceryItem';

export default function GroceryList() {
  const {
    groceries,
    handleAddGroceryItem,
    newGrocery,
    setNewGrocery,
    handleUpdate,
    handleDelete,
  } = useGroceries();

  return (
    <section className={style.listHolder}>
      <form onSubmit={handleAddGroceryItem}>
        <input
          className={style.addItemInput}
          type="text"
          placeholder="new item"
          value={newGrocery}
          onChange={(e) => setNewGrocery(e.target.value)}
        />
        <button className={style.addItemButton}>Add to List</button>
      </form>
      <ul className={style.groceryList}>
        {
          //change initial groceries later to state
          groceries.map((g) => {
            return (
              <li key={`${g.id}${g.item}`}>
                <GroceryItem
                  g={g}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              </li>
            );
          })
        }
      </ul>
    </section>
  );
}
