import style from './Header.css';

export default function Header() {
  return (
    <section className={style.header}>
      <h1>Shopping List</h1>
      <div className={style.navRight}>
        <p>Total items:</p>
        <div className={style.counter}>3</div>
        <p className={style.clearCart}>Clear Cart</p>
      </div>
    </section>
  );
}
