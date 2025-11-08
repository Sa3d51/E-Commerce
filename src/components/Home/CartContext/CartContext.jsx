import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id || i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id || i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function decreaseFromCart(id) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id || i._id === id);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((i) =>
          i.id === id || i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prev.filter((i) => i.id !== id && i._id !== id);
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id && item._id !== id)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      <div className="container-fluid px-3 px-md-5">{children}</div>
    </CartContext.Provider>
  );
}
