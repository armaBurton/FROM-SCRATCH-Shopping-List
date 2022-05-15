import { useState } from 'react';
import style from '../GroceryList/GroceryList.css';

export default function GroceryItem({ g, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let listItem;

  if (isEditing) {
    listItem = (
      <form
        className={style.formItem}
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(false);
        }}
      >
        <input
          className={style.editInput}
          aria-label="list-item"
          value={g.item}
          onChange={(e) => {
            console.log(e.target.value);
            onUpdate({
              ...g,
              item: e.target.value,
            });
          }}
        />
        <button className={`${style.edit} ${style.button}`} type="submit">
          Save
        </button>
      </form>
    );
  } else {
    listItem = (
      <>
        <p
          className={style.listItem}
          style={{ textDecoration: g.done ? 'line-through' : null }}
        >
          {g.item}
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className={`${style.edit} ${style.button}`}
        >
          edit
        </button>
      </>
    );
  }

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
      {listItem}
      <button
        className={`${style.delete} ${style.button}`}
        onClick={() => onDelete(g)}
      >
        delete
      </button>
    </>
  );
}
