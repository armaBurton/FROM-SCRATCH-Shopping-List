import style from './GroceryList.css';
import { useState } from 'react';

export default function GroceryList() {
  const [newGrocery, setNewGrocery] = useState('');

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
                <input type="checkbox" checked={g.done} onChange={(e) => {}} />
                <p className={style.listItem}>{g.item}</p>
                <button className={`${style.edit} ${style.button}`}>
                  edit
                </button>
                <button className={`${style.delete} ${style.button}`}>
                  delete
                </button>
              </li>
            );
          })
        }
      </ul>
    </section>
  );
}
