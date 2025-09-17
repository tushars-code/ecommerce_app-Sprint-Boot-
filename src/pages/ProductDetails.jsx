import axios from "axios";
import { ShoppingCart, Heart } from "lucide-react"; // modern icons

export default function ProductCard({ product, onAdded }) {
  const addToCart = async () => {
    await axios.post("https://ecommerce-backend-bqhd.onrender.com/cart", {
      productId: product.id,
      quantity: 1,
    });
    if (onAdded) onAdded();
  };

  const addToWishlist = async () => {
    await axios.post("https://ecommerce-backend-bqhd.onrender.com/wishlist", {
      productId: product.id,
    });
  };

  return (
    <div className="bg-white border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col">
      {/* Product Image */}
      <div className="flex items-center justify-center h-48 mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-gray-900 truncate">
        {product.name}
      </h3>
      <p className="text-xl font-bold text-green-600 mt-1">₹{product.price}</p>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={addToCart}
          className="flex items-center justify-center gap-2 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-3 rounded-lg shadow transition"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <button
          onClick={addToWishlist}
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-3 rounded-lg shadow transition"
        >
          <Heart size={18} />
          Wishlist
        </button>
      </div>
    </div>
  );
}
