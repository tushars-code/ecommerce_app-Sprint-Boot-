import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const fetch = () =>
    axios.get("https://ecommerce-backend-bqhd.onrender.com/wishlist").then((r) => setItems(r.data));

  useEffect(() => {
    fetch();
  }, []);

  const moveToCart = async (id) => {
    await axios.post("https://ecommerce-backend-bqhd.onrender.com/cart", { productId: id, quantity: 1 });
    await axios.delete(`https://ecommerce-backend-bqhd.onrender.com/wishlist/${id}`);
    fetch();
  };

  const removeFromWishlist = async (id) => {
    await axios.delete(`https://ecommerce-backend-bqhd.onrender.com/wishlist/${id}`);
    fetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No items in your wishlist.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center h-40 mb-4">
                <img
                  src={p.imageUrl || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {p.name}
              </h4>
              <p className="text-lg font-bold text-green-600 mt-1">₹{p.price}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => moveToCart(p.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg shadow transition"
                >
                  <ShoppingCart size={16} /> Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(p.id)}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg shadow transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
