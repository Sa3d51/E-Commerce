import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Gallery from "./components/Gallary/Gallery";
import Cart from "./components/Parent/Cart";
import { createHashRouter, RouterProvider } from "react-router-dom";
import CartContextProvider from "./components/Home/CartContext/CartContext";
import UserProvider, { UserContext } from "./components/UserContext/UserContext";
import Auth from "./components/Auth/Auth";
import { useContext } from "react";

function ProtectedRoute({ children }) {
  const { userToken } = useContext(UserContext);
  if (!userToken) return <Auth />;
  return children;
}

const _router = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Auth /> }, // افتراضي لو Home مش جاهز
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "gallery", element: <Gallery /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <CartContextProvider>
        <RouterProvider router={_router} />
      </CartContextProvider>
    </UserProvider>
  );
}
