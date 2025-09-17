import axios from "axios";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductCard({ product, onAdded }) {
  const addToCart = async () => {
    await axios.post("https://ecommerce-backend-bqhd.onrender.com/cart", {
      productId: product.id,
      quantity: 1,
    });
    onAdded && onAdded();
  };

  const addToWishlist = async () => {
    await axios.post("https://ecommerce-backend-bqhd.onrender.com//wishlist", {
      productId: product.id,
    });
    onAdded && onAdded();
  };

  return (
    <div className="w-56 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col">
      {/* Product Image */}
      <div className="flex items-center justify-center h-40 mb-4">
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
        {product.name}
      </h4>
      <p className="text-lg font-bold text-green-600 mt-1">₹{product.price}</p>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={addToCart}
          className="flex items-center justify-center gap-2 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition"
        >
          <ShoppingCart size={16} />
          Cart
        </button>
        <button
          onClick={addToWishlist}
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-3 rounded-lg transition"
        >
          <Heart size={16} />
        </button>
      </div>
    </div>
  );
}
