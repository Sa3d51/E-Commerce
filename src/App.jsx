import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Cart from "./components/Parent/Cart";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import CartContextProvider from "./components/Home/CartContext/CartContext";
import UserProvider, { UserContext } from "./components/UserContext/UserContext";
import Auth from "./components/Auth/Auth";
import { useContext } from "react";
import CheckOut from "./components/CheckOut/CheckOut";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function ProtectedRoute({ children }) {
  const { userToken } = useContext(UserContext);
  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AnimatedPage({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Math.random()}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const _router = createHashRouter([
  { path: "/", element: <Auth /> },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <AnimatedPage>
            <Home />
          </AnimatedPage>
        ),
      },
      {
        path: "contact",
        element: (
          <AnimatedPage>
            <Contact />
          </AnimatedPage>
        ),
      },
      {
        path: "cart",
        element: (
          <AnimatedPage>
            <Cart />
          </AnimatedPage>
        ),
      },
      {
        path: "checkout",
        element: (
          <AnimatedPage>
            <CheckOut />
          </AnimatedPage>
        ),
      },
      {
        path: "about",
        element: (
          <AnimatedPage>
            <About />
          </AnimatedPage>
        ),
      },
      {
        path: "*",
        element: (
          <AnimatedPage>
            <NotFound />
          </AnimatedPage>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <CartContextProvider>
        <RouterProvider router={_router} />
        <Toaster position="top-right" reverseOrder={false} />
      </CartContextProvider>
    </UserProvider>
  );
}
