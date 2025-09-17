import { useState } from "react";

export default function VendorDashboard() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://ecommerce-backend-bqhd.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("✅ Product added successfully!");
        setProduct({ name: "", description: "", price: "", imageUrl: "" });
      })
      .catch(() => setMessage("❌ Failed to add product."));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">🛍️ Vendor Dashboard</h2>
        {message && (
          <p className="mb-4 text-center text-green-600 font-medium">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price (₹)"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="url"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
