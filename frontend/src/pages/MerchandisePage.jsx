import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";

export default function MerchandisePage() {
  return (
  <div className="font-sans bg-white text-gray-900 pt-24 pb-32"> {/*  Fix added here */}
      <header className="bg-yellow-700 text-white py-14 text-center">
        <h1 className="text-4xl font-bold">Zonta Merchandise</h1>
        <p className="mt-2 text-yellow-100">Shop official Zonta gear and support our mission!</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-center">
          <ProductCard product={PRODUCTS[0]} />
        </div>
      </main>

      <CartDrawer />
    </div>
  );
}
