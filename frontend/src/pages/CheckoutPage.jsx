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
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background gradient matching Contact page */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Zonta Logo at top */}
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mb-8 w-48 opacity-90 hover:opacity-100 transition duration-300"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">Checkout</h1>
        <p className="text-lg mb-12 text-white/90">
          Complete your purchase and support our mission
        </p>

        {items.length === 0 ? (
          <div className="w-full bg-white shadow-lg rounded-2xl p-8 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>

              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-contain rounded-md"
                  />

                  <p className="flex-1 ml-4 font-medium text-gray-700">{item.name}</p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => (item.qty === 1 ? remove(item.id) : decrement(item.id))}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <span className="ml-4 font-semibold text-gray-800">
                    ${(item.qty * item.price).toFixed(2)}
                  </span>

                  <button
                    onClick={() => remove(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 hover:underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="mt-6 flex justify-between font-bold text-xl border-t pt-4">
                <p className="text-gray-800">Total:</p>
                <p className="text-yellow-700">${total.toFixed(2)}</p>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={placeOrder} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Contact Info</h2>
              <div className="flex flex-col">
                <input 
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                  placeholder="Full Name" 
                  required 
                />
              </div>
              <div className="flex flex-col">
                <input 
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                  type="email" 
                  placeholder="Email" 
                  required 
                />
              </div>
              <div className="flex flex-col">
                <input 
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                  type="tel" 
                  placeholder="Phone (Optional)" 
                />
              </div>

              <h2 className="text-2xl font-semibold mt-4 text-gray-800">Shipping Address</h2>
              <div className="flex flex-col">
                <input 
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                  placeholder="Street Address" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input 
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                    placeholder="City" 
                    required 
                  />
                </div>
                <div className="flex flex-col">
                  <input 
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                    placeholder="State" 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input 
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                    placeholder="ZIP Code" 
                    required 
                  />
                </div>
                <div className="flex flex-col">
                  <input 
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                    placeholder="Country" 
                    required 
                  />
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-4 text-gray-800">Payment Details</h2>
              <div className="flex flex-col">
                <input 
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                  placeholder="Card Number" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input 
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                    placeholder="MM/YY" 
                    required 
                  />
                </div>
                <div className="flex flex-col">
                  <input 
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                    placeholder="CVC" 
                    required 
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={placing}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}