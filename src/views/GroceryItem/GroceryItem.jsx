import { useState } from 'react';
import style from '../GroceryList/GroceryList.css';

export default function GroceryItem({ g, onChange, onDelete }) {
  const [isLoading, setIsLoading] = useState();

  return (
    <>
      <input type="checkbox" checked={g.done} onChange={(e) => {}} />
      <p className={style.listItem}>{g.item}</p>
      <button className={`${style.edit} ${style.button}`}>edit</button>
      <button className={`${style.delete} ${style.button}`}>delete</button>
    </>
  );
}
