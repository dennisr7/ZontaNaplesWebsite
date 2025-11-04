import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";

export default function MerchandisePage() {
  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background gradient matching Contact page */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Zonta Logo moved to top */}
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mb-8 w-48 opacity-90 hover:opacity-100 transition duration-300"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">Zonta Merchandise</h1>
        <p className="text-lg mb-12 text-white/90">
          Shop official Zonta gear and support our mission!
        </p>

        <div className="w-full">
          <div className="flex justify-center">
            <ProductCard product={PRODUCTS[0]} />
          </div>
        </div>
      </div>

      <CartDrawer />
    </main>
  );
}