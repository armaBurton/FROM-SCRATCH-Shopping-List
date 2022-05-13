import style from './Header.css';
import { useGroceries } from '../../context/GroceryProvider';

export default function Header() {
  const { groceries, handleReset } = useGroceries();

  return (
    <>
      <section className={style.header}>
        <h1>Shopping List</h1>
        <div className={style.navRight}>
          <p>Total items:</p>
          <div className={style.counter}>
            {groceries === null ? 0 : groceries.length}
          </div>
          <p className={style.clearCart} onClick={handleReset}>
            Clear Carts
          </p>
        </div>
      </section>
    </>
  );
}
