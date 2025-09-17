import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Package, Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-yellow-400 tracking-wide">
          E-Shop
        </Link>
      

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <Home size={18} /> Home
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <ShoppingCart size={18} /> Cart
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <Heart size={18} /> Wishlist
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <Package size={18} /> Orders
          </Link>

           <Link to="/vendor">Vendor Dashboard</Link>
           <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
