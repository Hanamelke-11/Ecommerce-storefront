import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <article
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "white",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
      </Link>

      {/* Product Info */}
      <div style={{ padding: "16px" }}>
        {/* Category Badge */}
        <span
          style={{
            backgroundColor: "#e8f4fd",
            color: "#1a73e8",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {product.category}
        </span>

        {/* Name */}
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "600",
            margin: "8px 0 4px",
            color: "#1a1a2e",
          }}
        >
          {product.name}
        </h2>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "8px",
          }}
        >
          <Star size={14} fill="#f4a817" color="#f4a817" />
          <span style={{ fontSize: "13px", color: "#666" }}>
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#e63946",
            marginBottom: "12px",
          }}
        >
          ${product.price}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: product.inStock ? "#1a1a2e" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: product.inStock ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <ShoppingCart size={16} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}
