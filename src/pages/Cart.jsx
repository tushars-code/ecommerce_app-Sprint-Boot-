import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(null);

  const fetch = () =>
    axios.get("https://ecommerce-backend-bqhd.onrender.com/cart").then((r) => setCart(r.data));

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id) => {
    await axios.delete(`https://ecommerce-backend-bqhd.onrender.com/cart/${id}`);
    fetch();
  };

  const placeOrder = async () => {
    setPlacing(true);
    const body = {
      items: cart.map((ci) => ({
        productId: ci.product.id,
        quantity: ci.quantity,
      })),
      clearCart: true,
    };
    const res = await axios.post("https://ecommerce-backend-bqhd.onrender.com/orders", body);
    setPlacing(false);
    setSuccess(res.data);
    fetch();
    setTimeout(() => setSuccess(null), 4000);
  };

  const total = cart.reduce(
    (s, c) => s + c.product.price * c.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={c.product.imageUrl || "https://via.placeholder.com/80"}
                alt={c.product.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">
                  {c.product.name}
                </div>
                <div className="text-sm text-gray-600">
                  Qty: {c.quantity} • ₹{c.product.price}
                </div>
              </div>
              <button
                onClick={() => remove(c.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mt-4">
            <h3 className="text-lg font-bold">Total: ₹{total}</h3>
            <button
              onClick={placeOrder}
              disabled={placing || cart.length === 0}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              {placing ? "Placing..." : "Place Order"}
            </button>
          </div>
        </div>
      )}

      {/* 🎉 Order placed animation */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg"
          >
            <p className="font-semibold">
              🎉 Order placed: #{success.id}
            </p>
            <p className="text-sm">Status: {success.status}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
