// src/components/ProductCard.jsx
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-t-lg bg-white"/>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-yellow-800">{product.name}</h3>
        <p className="text-gray-700 mt-1">{product.description}</p>
        <div className="mt-auto">
          <p className="text-yellow-800 font-bold">${product.price.toFixed(2)}</p>
          <button onClick={() => add(product)} className="mt-3 w-full bg-yellow-700 text-white py-2 rounded-full hover:bg-yellow-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
