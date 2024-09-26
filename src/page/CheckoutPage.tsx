// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import { useAppSelector } from "../store/store";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";

const CheckoutPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [voucher, setVoucher] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice = totalPrice - totalPrice * discount;

  // Handle applying voucher
  const applyVoucher = () => {
    if (voucher === "DISCOUNT5") {
      setDiscount(0.05); // Apply 5% discount
    } else {
      setDiscount(0); // Invalid or no discount
    }
  };

  // Handle submitting the order
  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    // You can integrate your payment or order submission logic here
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-4">
      <Helmet>
        <title>Checkout Page</title>
      </Helmet>
      <Header />
      <h2 className="tw-text-3xl tw-font-bold tw-mb-6">Checkout</h2>

      {/* Order Summary */}
      <div className="tw-bg-white tw-p-6 tw-shadow-md tw-rounded-lg tw-mb-6">
        <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="tw-mb-2">
                  {item.title} - {item.quantity} x ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="tw-mt-4 tw-text-lg">
              <p className="tw-font-semibold">
                Subtotal: ${totalPrice.toFixed(2)}
              </p>
              {discount > 0 && (
                <p className="tw-text-green-500">
                  Discount: -${(totalPrice * discount).toFixed(2)} (5%)
                </p>
              )}
              <p className="tw-font-bold">
                Total: ${discountedPrice.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Billing Details */}
      <div className="tw-bg-white tw-p-6 tw-shadow-md tw-rounded-lg tw-mb-6">
        <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">
          Billing Details
        </h3>
        <form>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-sm tw-font-medium tw-mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-sm tw-font-medium tw-mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label
              className="tw-block tw-text-sm tw-font-medium tw-mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded"
              placeholder="Enter your email"
              required
            />
          </div>
        </form>
      </div>

      {/* Voucher Section */}
      <div className="tw-bg-white tw-p-6 tw-shadow-md tw-rounded-lg tw-mb-6">
        <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">Voucher</h3>
        <input
          type="text"
          className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded tw-mb-4"
          placeholder="Enter voucher code"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
        />
        <button
          className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-blue-600"
          onClick={applyVoucher}
        >
          Apply Voucher
        </button>
      </div>

      {/* Place Order Button */}
      <div className="tw-text-center">
        <button
          className="tw-bg-green-500 tw-text-white tw-py-3 tw-px-6 tw-rounded tw-font-bold tw-text-xl hover:tw-bg-green-600"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
