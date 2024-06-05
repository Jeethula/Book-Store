import './App.css';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Wishlist from './pages/Wishlist';
import Main from './pages/Main';

function App() {

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  }
]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
