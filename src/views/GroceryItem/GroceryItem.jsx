import { useState } from 'react';
import style from '../GroceryList/GroceryList.css';

export default function GroceryItem({ g, onUpdate, onDelete }) {
  const [isLoading, setIsLoading] = useState();

  return (
    <>
      <input
        type="checkbox"
        checked={g.done}
        onChange={(e) => {
          onUpdate({
            ...g,
            done: e.target.checked,
          });
        }}
      />
      <p
        className={style.listItem}
        style={{ textDecoration: g.done ? 'line-through' : null }}
      >
        {g.item}
      </p>
      <button className={`${style.edit} ${style.button}`}>edit</button>
      <button
        className={`${style.delete} ${style.button}`}
        onClick={() => onDelete(g)}
      >
        delete
      </button>
    </>
  );
}
