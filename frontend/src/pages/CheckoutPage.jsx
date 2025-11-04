import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, increment, decrement, remove, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const nav = useNavigate();

  const placeOrder = (e) => {
    e.preventDefault();
    setPlacing(true);

    setTimeout(() => {
      clear();
      setPlacing(false);
      nav("/?order=success");
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-yellow-800 mb-8">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain rounded-md"
                />

                <p className="flex-1 ml-4 font-medium">{item.name}</p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => (item.qty === 1 ? remove(item.id) : decrement(item.id))}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

 
                <span className="ml-4 font-semibold">
                  ${(item.qty * item.price).toFixed(2)}
                </span>

                <button
                  onClick={() => remove(item.id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6 flex justify-between font-bold text-xl">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={placeOrder} className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <input className="w-full border rounded px-3 py-2" placeholder="Full Name" required />
            <input className="w-full border rounded px-3 py-2" type="email" placeholder="Email" required />
            <input className="w-full border rounded px-3 py-2" type="tel" placeholder="Phone (Optional)" />

            <h2 className="text-xl font-semibold mt-4">Shipping Address</h2>
             <input className="w-full border rounded px-3 py-2" placeholder="Street Address" required />
            <div className="grid grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="City" required />
              <input className="border rounded px-3 py-2" placeholder="State" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="ZIP Code" required />
              <input className="border rounded px-3 py-2" placeholder="Country" required />
            </div>

            <h2 className="text-xl font-semibold mt-4">Payment Details</h2>
            <input className="w-full border rounded px-3 py-2" placeholder="Card Number" required />
            <div className="grid grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="MM/YY" required />
              <input className="border rounded px-3 py-2" placeholder="CVC" required />
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-yellow-700 hover:bg-yellow-800 text-white rounded-full py-3 mt-4 disabled:opacity-60"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
