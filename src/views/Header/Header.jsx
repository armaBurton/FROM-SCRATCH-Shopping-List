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
          <div className={style.counter}>{groceries.length}</div>
          <p className={style.clearCart} onClick={handleReset}>
            Clear Carts
          </p>
        </div>
      </section>
      {/* <section className={style.listHolder}>
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
                  <input
                    type="checkbox"
                    checked={g.done}
                    onChange={(e) => {}}
                  />
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
      </section> */}
    </>
  );
}

{
  /* <input
  type="checkbox"
  checked={todo.done}
  onChange={(e) => {
    onUpdate({ ...todo, done: e.target.checked });
  }}
/>; */
}

// import { createContext, useContext, useReducer } from 'react';

// const initialTodos = [{ id: Date.now(), text: 'Get stuff done', done: false }];

// const todoReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       // Return our updated state with the newly added todo at the
//       // beginning of our list
//       return [
//         { id: Date.now(), text: action.payload.text, done: false },
//         ...state,
//       ];
//     case 'UPDATE_TODO':
//       // Find the provided todo
//       // Update its contents
//       // Return a new array with the updated todo
//       return state.map((todo) => {
//         if (todo.id === action.payload.todo.id) {
//           const { done, text } = action.payload.todo;

//           return {
//             ...todo,
//             done,
//             text,
//           };
//         }

//         return todo;
//       });
//     case 'DELETE_TODO':
//       return state.filter((todo) => todo.id !== action.payload.id);
//     default:
//       throw new Error(`Action type ${action.type} is not supported`);
//   }
// };

// const TodoContext = createContext();

// export const TodoProvider = ({ children }) => {
//   const [todos, dispatch] = useReducer(todoReducer, initialTodos);

//   const handleAddTodo = (text) => {
//     dispatch({ type: 'ADD_TODO', payload: { text } });
//     // todoReducer([{ id: 123, text: '', done: false }], { type: 'ADD_TODO', payload: { text } })
//   };

//   const handleUpdateTodo = (todo) => {
//     dispatch({ type: 'UPDATE_TODO', payload: { todo } });
//   };

//   const handleDeleteTodo = (id) => {
//     dispatch({ type: 'DELETE_TODO', payload: { id } });
//   };

//   return (
//     <TodoContext.Provider
//       value={{ todos, handleAddTodo, handleUpdateTodo, handleDeleteTodo }}
//     >
//       {children}
//     </TodoContext.Provider>
//   );
// };

// export const useTodos = () => {
//   const context = useContext(TodoContext);
//   // context = { todos, handleAddTodo, handleUpdateTodo, handleDeleteTodo }

//   if (context === undefined)
//     throw new Error('useTodos must be called from within a TodoProvider');

//   return context;
// };
