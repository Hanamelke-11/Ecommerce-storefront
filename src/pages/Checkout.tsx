import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
};

type FormErrors = Partial<FormData>;

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validate all fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";

    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.address.trim()) newErrors.address = "Address is required";

    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (form.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!form.cardExpiry.trim()) {
      newErrors.cardExpiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) {
      newErrors.cardExpiry = "Use format MM/YY";
    }

    if (!form.cardCVC.trim()) {
      newErrors.cardCVC = "CVC is required";
    } else if (form.cardCVC.length !== 3) {
      newErrors.cardCVC = "CVC must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setOrderPlaced(true);
      clearCart();
    }
  };

  // Success State
  if (orderPlaced) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <CheckCircle size={80} color="#2a9d5c" />
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1a1a2e",
            marginTop: "20px",
          }}
        >
          Order Placed Successfully!
        </h1>
        <p style={{ color: "#666", marginTop: "12px", fontSize: "16px" }}>
          Thank you for your purchase. Your order is being processed.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "30px",
            padding: "12px 32px",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Empty cart — redirect
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }} role="alert">
        <h2>Your cart is empty!</h2>
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
          Go Shopping
        </button>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const errorStyle = {
    color: "#e63946",
    fontSize: "12px",
    marginTop: "4px",
  };

  const labelStyle = {
    display: "block" as const,
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
  };

  return (
    <div style={{ padding: "30px 40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#1a1a2e",
        }}
      >
        Checkout
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "40px",
        }}
      >
        {/* LEFT — Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Shipping Info */}
          <div
            style={{
              padding: "24px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>
              Shipping Information
            </h2>

            {/* First & Last Name */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label htmlFor="firstName" style={labelStyle}>
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  aria-describedby="firstName-error"
                  style={{
                    ...inputStyle,
                    border: `1px solid ${errors.firstName ? "#e63946" : "#ddd"}`,
                  }}
                />
                {errors.firstName && (
                  <p id="firstName-error" style={errorStyle} role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" style={labelStyle}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  aria-describedby="lastName-error"
                  style={{
                    ...inputStyle,
                    border: `1px solid ${errors.lastName ? "#e63946" : "#ddd"}`,
                  }}
                />
                {errors.lastName && (
                  <p id="lastName-error" style={errorStyle} role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="email" style={labelStyle}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                aria-describedby="email-error"
                style={{
                  ...inputStyle,
                  border: `1px solid ${errors.email ? "#e63946" : "#ddd"}`,
                }}
              />
              {errors.email && (
                <p id="email-error" style={errorStyle} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="phone" style={labelStyle}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="0712345678"
                aria-describedby="phone-error"
                style={{
                  ...inputStyle,
                  border: `1px solid ${errors.phone ? "#e63946" : "#ddd"}`,
                }}
              />
              {errors.phone && (
                <p id="phone-error" style={errorStyle} role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="address" style={labelStyle}>
                Street Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                aria-describedby="address-error"
                style={{
                  ...inputStyle,
                  border: `1px solid ${errors.address ? "#e63946" : "#ddd"}`,
                }}
              />
              {errors.address && (
                <p id="address-error" style={errorStyle} role="alert">
                  {errors.address}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" style={labelStyle}>
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="Nairobi"
                aria-describedby="city-error"
                style={{
                  ...inputStyle,
                  border: `1px solid ${errors.city ? "#e63946" : "#ddd"}`,
                }}
              />
              {errors.city && (
                <p id="city-error" style={errorStyle} role="alert">
                  {errors.city}
                </p>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div
            style={{
              padding: "24px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>
              Payment Information
            </h2>

            {/* Card Number */}
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="cardNumber" style={labelStyle}>
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                aria-describedby="cardNumber-error"
                style={{
                  ...inputStyle,
                  border: `1px solid ${errors.cardNumber ? "#e63946" : "#ddd"}`,
                }}
              />
              {errors.cardNumber && (
                <p id="cardNumber-error" style={errorStyle} role="alert">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Expiry & CVC */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label htmlFor="cardExpiry" style={labelStyle}>
                  Expiry Date
                </label>
                <input
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  value={form.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  aria-describedby="cardExpiry-error"
                  style={{
                    ...inputStyle,
                    border: `1px solid ${errors.cardExpiry ? "#e63946" : "#ddd"}`,
                  }}
                />
                {errors.cardExpiry && (
                  <p id="cardExpiry-error" style={errorStyle} role="alert">
                    {errors.cardExpiry}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cardCVC" style={labelStyle}>
                  CVC
                </label>
                <input
                  id="cardCVC"
                  name="cardCVC"
                  type="text"
                  value={form.cardCVC}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={3}
                  aria-describedby="cardCVC-error"
                  style={{
                    ...inputStyle,
                    border: `1px solid ${errors.cardCVC ? "#e63946" : "#ddd"}`,
                  }}
                />
                {errors.cardCVC && (
                  <p id="cardCVC-error" style={errorStyle} role="alert">
                    {errors.cardCVC}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
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
            Place Order — ${total.toFixed(2)}
          </button>
        </form>

        {/* RIGHT — Order Summary */}
        <div>
          <div
            style={{
              padding: "24px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              position: "sticky",
              top: "80px",
            }}
          >
            <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#444" }}>
                  {item.name} × {item.quantity}
                </span>
                <span style={{ fontWeight: "600" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <hr style={{ margin: "16px 0" }} />

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
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
