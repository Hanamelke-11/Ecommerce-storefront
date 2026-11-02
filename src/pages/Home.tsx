import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const categories = ["All", "Electronics", "Clothing", "Books"];

export default function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [category, setCategory] = useState("All");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category),
  );

  return (
    <div style={{ padding: "30px 40px" }}>
      {/* Category Filters */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              border: "2px solid #1a1a2e",
              backgroundColor: category === cat ? "#1a1a2e" : "white",
              color: category === cat ? "white" : "#1a1a2e",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search result message */}
      {search && (
        <p style={{ marginBottom: "16px", color: "#666" }}>
          Showing results for: <strong>"{search}"</strong>— {filtered.length}{" "}
          product{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            color: "#666",
          }}
          role="status"
        >
          <p style={{ fontSize: "18px" }}>No products found 😕</p>
          <p>Try a different search or category</p>
        </div>
      )}

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
