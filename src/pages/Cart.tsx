import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
        }}
        role="status"
      >
        <ShoppingBag size={64} color="#ccc" />
        <h2 style={{ color: "#666", marginTop: "16px" }}>Your cart is empty</h2>
        <p style={{ color: "#999", marginBottom: "24px" }}>
          Add some products to get started!
        </p>
        <Link
          to="/"
          style={{
            padding: "12px 28px",
            backgroundColor: "#1a1a2e",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px 40px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1a1a2e" }}>
          Your Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})
        </h1>
        <button
          onClick={clearCart}
          style={{
            padding: "8px 16px",
            backgroundColor: "transparent",
            border: "2px solid #e63946",
            color: "#e63946",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              backgroundColor: "white",
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontWeight: "600",
                  color: "#1a1a2e",
                  marginBottom: "4px",
                }}
              >
                {item.name}
              </h3>
              <p style={{ color: "#666", fontSize: "14px" }}>{item.category}</p>
              <p
                style={{
                  color: "#e63946",
                  fontWeight: "700",
                  marginTop: "4px",
                }}
              >
                ${item.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "4px 8px",
              }}
            >
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
                style={{
                  width: "28px",
                  height: "28px",
                  border: "none",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                −
              </button>
              <span
                style={{
                  fontWeight: "600",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
                style={{
                  width: "28px",
                  height: "28px",
                  border: "none",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <p
              style={{
                fontWeight: "700",
                minWidth: "70px",
                textAlign: "right",
              }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "#e63946",
              }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div
        style={{
          marginTop: "30px",
          padding: "24px",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
          Order Summary
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#2a9d5c",
            marginBottom: "8px",
          }}
        >
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <hr style={{ margin: "16px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a1a2e",
          }}
        >
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* ✅ Checkout Button — now navigates to /checkout */}
        <button
          onClick={() => navigate("/checkout")}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>

        {/* Continue Shopping */}
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "12px",
            color: "#666",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
