import style from './GroceryList.css';

export default function GroceryList() {
  return (
    <section className={style.listHolder}>
      <form>
        <input
          className={style.addItemInput}
          type="text"
          placeholder="new item"
        />
        <button className={style.addItemButton}>Add to List</button>
      </form>
      <ul className={style.groceryList}>
        <li>
          <input type="checkbox" />
          <p className={style.listItem}>This is a list item</p>
          <button className={`${style.edit} ${style.button}`}>edit</button>
          <button className={`${style.delete} ${style.button}`}>delete</button>
        </li>
        <li>
          <input type="checkbox" />
          <p className={style.listItem}>This is another list item</p>
          <button className={`${style.edit} ${style.button}`}>edit</button>
          <button className={`${style.delete} ${style.button}`}>delete</button>
        </li>
        <li>
          <input type="checkbox" />
          <p className={style.listItem}>This is a third list item</p>
          <button className={`${style.edit} ${style.button}`}>edit</button>
          <button className={`${style.delete} ${style.button}`}>delete</button>
        </li>
      </ul>
    </section>
  );
}
