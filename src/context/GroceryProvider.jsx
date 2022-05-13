import { createContext, useContext, useReducer, useState } from 'react';

const initialGroceries = [
  { id: Math.floor(Math.random() * 999999999), item: 'Hotdog', done: false },
  { id: Math.floor(Math.random() * 999999999), item: 'Hamburger', done: false },
  { id: Math.floor(Math.random() * 999999999), item: 'Pizza', done: false },
];

const createId = (action) => {
  return Math.floor(Math.random() * 999999999) + action.payload.item;
};

const groceryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROCERY':
      return [
        {
          id: createId(action),
          item: action.payload.item,
          done: false,
        },
        ...state,
      ];
    case 'UPDATE_GROCERY':
      return state.map((g) => {
        console.log(
          `|| g.id, action.payload.update.id >`,
          g.id,
          action.payload.update.id
        );
        if (g.id === action.payload.update.id) {
          const { done, item } = action.payload.update;
          return {
            ...g,
            done,
            item,
          };
        }
        return g;
      });
    case 'DELETE_GROCERY':
      return state.filter((g) => g.id !== action.payload.id);
    case 'RESET':
      state = [];
      return [...state];
    default:
      throw new Error(`Action type ${action.type} is not supported.`);
  }
};

const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
  const [groceries, dispatch] = useReducer(groceryReducer, initialGroceries);
  const [newGrocery, setNewGrocery] = useState('');

  const handleAddGroceryItem = (e) => {
    e.preventDefault();
    if (newGrocery === '') {
      return;
    } else {
      dispatch({
        type: 'ADD_GROCERY',
        payload: { item: newGrocery },
      });
      setNewGrocery('');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch({
      type: 'RESET',
    });
  };

  const handleUpdate = (update) => {
    dispatch({ type: 'UPDATE_GROCERY', payload: { update } });
  };

  const handleDelete = (g) => {
    if (!g.done) return;
    const id = g.id;
    dispatch({ type: 'DELETE_GROCERY', payload: { id } });
  };

  return (
    <GroceryContext.Provider
      value={{
        groceries,
        handleAddGroceryItem,
        handleReset,
        newGrocery,
        setNewGrocery,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGroceries = () => {
  const context = useContext(GroceryContext);

  if (context === undefined)
    throw new Error('useGroceries must be called withing a GroceryProvider');

  return context;
};
