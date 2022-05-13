import { createContext, useContext, useReducer, useState } from 'react';

const initialGroceries = [
  { id: Date.now(), item: 'Hotdog', done: false },
  { id: Date.now(), item: 'Hamburger', done: false },
  { id: Date.now(), item: 'Pizza', done: false },
];

const groceryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROCERY':
      return [
        { id: Date.now(), item: action.payload.item, done: false },
        ...state,
      ];
    case 'UPDATE_GROCERY':
      return;
    case 'DELETE_GROCERY':
      return;
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

  return (
    <GroceryContext.Provider
      value={{
        groceries,
        handleAddGroceryItem,
        handleReset,
        newGrocery,
        setNewGrocery,
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
