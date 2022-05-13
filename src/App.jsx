import Header from './views/Header/Header';
import GroceryList from './views/GroceryList/GroceryList';
import { GroceryProvider } from './context/GroceryProvider';

export default function App() {
  return (
    <GroceryProvider>
      <Header />
      <GroceryList />
    </GroceryProvider>
  );
}
