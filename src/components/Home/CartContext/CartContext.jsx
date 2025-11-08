import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
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

  function addToCart(item, showToast = true) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id || i._id === item._id);
      if (existing) {
        const updated = prev.map((i) =>
          i.id === item.id || i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        if (showToast)
          toast.success(`Added one more ${item.title} 🛒`, {
            style: { background: "#fff", color: "#000" },
          });
        return updated;
      } else {
        if (showToast)
          toast.success(`${item.title} added to cart 🛒`, {
            style: { background: "#fff", color: "#000" },
          });
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function decreaseQuantity(id, showToast = true) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id || i._id === id);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        const updated = prev.map((i) =>
          i.id === id || i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
        if (showToast)
          toast(`Removed one ${existing.title} ➖`, {
            style: { background: "#fff", color: "#000" },
          });
        return updated;
      } else {
        const filtered = prev.filter((i) => i.id !== id && i._id !== id);
        if (showToast)
          toast.error(`${existing.title} removed from cart ❌`, {
            style: { background: "#fff", color: "#000" },
          });
        return filtered;
      }
    });
  }

  function removeFromCart(id, showToast = true) {
    setCartItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id && item._id !== id);
      if (showToast)
        toast.error(`Item removed from cart ❌`, {
          style: { background: "#fff", color: "#000" },
        });
      return filtered;
    });
  }

  function clearCart(showToast = true) {
    setCartItems([]);
    if (showToast)
      toast.error("Cart cleared ❌", {
        style: { background: "#fff", color: "#000" },
      });
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
        decreaseQuantity,
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
