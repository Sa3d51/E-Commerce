import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Cart from "./components/Parent/Cart";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CartContextProvider from "./components/Home/CartContext/CartContext";
import UserProvider, { UserContext } from "./components/UserContext/UserContext";
import Auth from "./components/Auth/Auth";
import { useContext, Suspense } from "react";
import CheckOut from "./components/CheckOut/CheckOut";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Categories from "./components/Categories/Categories";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";

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

export default function App() {
  return (
    <UserProvider>
      <CartContextProvider>
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <BrowserRouter basename="/E-Commerce">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <AnimatedPage>
                      <Categories />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="categories"
                  element={
                    <AnimatedPage>
                      <Categories />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="categories/:id"
                  element={
                    <AnimatedPage>
                      <CategoryProducts />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="all-products"
                  element={
                    <AnimatedPage>
                      <Home />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="contact"
                  element={
                    <AnimatedPage>
                      <Contact />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <AnimatedPage>
                      <Cart />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="checkout"
                  element={
                    <AnimatedPage>
                      <CheckOut />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="about"
                  element={
                    <AnimatedPage>
                      <About />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="*"
                  element={
                    <AnimatedPage>
                      <NotFound />
                    </AnimatedPage>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
        <Toaster position="top-right" reverseOrder={false} />
      </CartContextProvider>
    </UserProvider>
  );
}
