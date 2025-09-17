import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://ecommerce-backend-bqhd.onrender.com/orders").then((r) => setOrders(r.data));
  }, []);

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📦 Your Orders
      </h2>

      {/* Empty state */}
      {orders.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-500"
        >
          No orders yet
        </motion.p>
      )}

      {/* Orders list */}
      <div className="flex flex-col gap-6">
        {orders.map((o, index) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-md"
          >
            {/* Order Info */}
            <div className="mb-3">
              <div className="font-semibold text-lg">Order #{o.id}</div>
              <div className="text-sm">
                Status:{" "}
                <span className="text-blue-600 font-medium">{o.status}</span>
              </div>
              <div className="text-sm">
                Total:{" "}
                <span className="font-bold text-gray-800">₹{o.totalPrice}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Created: {new Date(o.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Order Items */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-700">
                Items ({o.items.length})
              </summary>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {o.items.map((it) => {
                  const product = it.product || {};
                  const imageUrl =
                    product.imageUrl ||
                    "https://via.placeholder.com/200x150.png?text=No+Image";

                  return (
                    <motion.div
                      key={it.id}
                      whileHover={{ scale: 1.05 }}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-gray-50"
                    >
                      <Link
                        to={`/product/${product.id || it.productId}`}
                        className="block"
                      >
                        {/* Product Image */}
                        <img
                          src={imageUrl}
                          alt={product.name || `Product #${it.productId}`}
                          className="w-full h-36 object-cover bg-gray-200"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/200x150.png?text=Image+Not+Found";
                          }}
                        />

                        {/* Product Info */}
                        <div className="p-3 text-center">
                          <div className="font-medium text-sm truncate">
                            {product.name || `Product #${it.productId}`}
                          </div>
                          <div className="text-xs text-gray-500">
                            Qty: {it.quantity}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </details>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
