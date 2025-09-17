import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetch = () =>
    axios.get("https://ecommerce-backend-bqhd.onrender.com/products").then((r) => {
      setProducts(r.data);
      setFiltered(r.data);
    });

  useEffect(() => {
    fetch();
  }, []);

  // 🔍 Live search filter
  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(products.filter((p) => p.name.toLowerCase().includes(term)));
  }, [search, products]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Product grid */}
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdded={fetch} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
