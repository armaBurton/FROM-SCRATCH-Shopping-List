import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const createId = (action) => {
  return Math.floor(Math.random() * 999999999) + action.payload.item;
};

const groceryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROCERY':
      const storage = [
        { id: createId(action), item: action.payload.item, done: false },
        ...state,
      ];

      localStorage.setItem('gList', JSON.stringify([...storage]));

      let getStorage = localStorage.getItem('gList');
      console.log(`|| getStorage >`, JSON.parse(getStorage));
      return [
        {
          id: createId(action),
          item: action.payload.item,
          done: false,
        },
        ...state,
      ];
    case 'UPDATE_GROCERY':
      const updateList = state.map((g) => {
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
      localStorage.setItem('gList', JSON.stringify([...updateList]));

      return updateList;
    case 'DELETE_GROCERY':
      const update = state.filter((g) => g.id !== action.payload.id);
      console.log(`|| update >`, update);
      localStorage.setItem('glist', JSON.stringify([...update]));
      return update;
    // return state.filter((g) => g.id !== action.payload.id);
    case 'RESET':
      state = [];
      localStorage.clear();
      localStorage.setItem('glist', JSON.stringify([...state]));
      return [...state];
    default:
      throw new Error(`Action type ${action.type} is not supported.`);
  }
};

const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
  const [groceries, dispatch] = useReducer(
    groceryReducer,
    JSON.parse(localStorage.getItem('gList'))
  );
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
