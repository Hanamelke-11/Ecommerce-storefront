import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  // Error state — product not found
  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }} role="alert">
        <h2>Product not found 😕</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "16px",
            padding: "10px 24px",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px 40px", maxWidth: "1000px", margin: "0 auto" }}>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          color: "#1a1a2e",
          marginBottom: "30px",
          fontWeight: "600",
        }}
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Product Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "start",
      }}>

        {/* LEFT — Image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            borderRadius: "16px",
            objectFit: "cover",
            maxHeight: "400px",
          }}
        />

        {/* RIGHT — Info */}
        <div>

          {/* Category Badge */}
          <span style={{
            backgroundColor: "#e8f4fd",
            color: "#1a73e8",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
          }}>
            {product.category}
          </span>

          {/* Name */}
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1a1a2e",
            margin: "12px 0 8px",
          }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "16px",
          }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < Math.floor(product.rating) ? "#f4a817" : "#ddd"}
                color={i < Math.floor(product.rating) ? "#f4a817" : "#ddd"}
              />
            ))}
            <span style={{ color: "#666", fontSize: "14px" }}>
              ({product.rating} out of 5)
            </span>
          </div>

          {/* Description */}
          <p style={{
            color: "#555",
            fontSize: "15px",
            lineHeight: "1.7",
            marginBottom: "20px",
          }}>
            {product.description}
          </p>

          {/* Price */}
          <p style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#e63946",
            marginBottom: "24px",
          }}>
            ${product.price}
          </p>

          {/* Stock Status */}
          <p style={{
            marginBottom: "16px",
            fontWeight: "600",
            color: product.inStock ? "#2a9d5c" : "#e63946",
          }}>
            {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: product.inStock ? "#1a1a2e" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: product.inStock ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <ShoppingCart size={20} />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

        </div>
      </div>
    </div>
  );
}