import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      navigate(`/?search=${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 40px",
      backgroundColor: "#1a1a2e",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>

      {/* LEFT — Logo */}
      <Link to="/" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "white",
        textDecoration: "none",
        fontSize: "22px",
        fontWeight: "bold",
      }}>
        <Store size={28} />
        ShopEasy
      </Link>

      {/* MIDDLE — Search */}
      <input
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        value={currentSearch}
        onChange={handleSearch}
        style={{
          padding: "8px 16px",
          borderRadius: "20px",
          border: "none",
          width: "300px",
          fontSize: "14px",
          outline: "none",
        }}
      />

      {/* RIGHT — Cart */}
      <Link
        to="/cart"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "white",
          textDecoration: "none",
          fontSize: "16px",
          position: "relative",
        }}
        aria-label={`View cart with ${itemCount} items`}
      >
        <ShoppingCart size={26} />
        Cart
        {itemCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            backgroundColor: "#e63946",
            color: "white",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}>
            {itemCount}
          </span>
        )}
      </Link>

    </nav>
  );
}