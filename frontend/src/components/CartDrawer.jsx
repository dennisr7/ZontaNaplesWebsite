// src/components/CartDrawer.jsx

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, remove, clear, total } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Navigate to checkout and close cart
  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
  onClick={() => setOpen(true)}
  className="fixed bottom-6 right-6 bg-yellow-700 text-white py-3 px-5 rounded-full shadow-lg hover:bg-yellow-800 z-50"
>
  Cart 🛒 ({items.length})
</button>

      {/* Overlay (click outside to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Slide-in Drawer */}
      {open && (
        <div
          className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 p-6"
          onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
        >
          {/* Close Button */}
          <button
            className="text-gray-600 mb-4 self-end"
            onClick={() => setOpen(false)}
          >
            ✖
          </button>

          {/* Cart Items */}
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Section */}
          <div className="mt-4 border-t pt-4">
            <p className="font-bold mb-3">Total: ${total.toFixed(2)}</p>

            {items.length > 0 && (
              <>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-2 rounded-md mb-3"
                >
                  Checkout
                </button>
                <button
                  onClick={clear}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
