import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import CartItems from "./Cart/CartItems";
import useRoute from "../hook/useRouter";

const CartPage: React.FC = () => {
  const { clickRouteLink } = useRoute();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [voucher, setVoucher] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [error, setError] = useState("");

  // Handle removing an item from the cart
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id)); // Dispatch action to remove item from Redux store
  };

  // Handle incrementing the quantity of an item
  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id)); // Dispatch action to increment quantity
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id)); // Dispatch action to decrement quantity
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (isVoucherApplied) {
      return total * 0.95; // Apply 5% discount
    }
    return total;
  };

  // Handle voucher code application
  const handleApplyVoucher = () => {
    if (voucher.trim().toLowerCase() === "save5") {
      setIsVoucherApplied(true);
      setError("");
    } else {
      setError('Invalid voucher code. Try "SAVE5".');
    }
  };

  // Render when cart is empty
  const renderEmptyCart = () => (
    <div className="tw-container tw-mx-auto tw-p-4 tw-text-center">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Your Cart</h2>
      <p>No items found in the cart.</p>
      <Link to="/" className="tw-text-blue-500 tw-underline">
        Continue Shopping
      </Link>
    </div>
  );

  // Render cart items
  const renderCartItems = () => (
    <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
      {cartItems.map((item) => (
        <CartItems
          key={item.id}
          item={item}
          onRemove={handleRemoveItem}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      ))}
    </div>
  );

  return (
    <div className="tw-container tw-mx-auto tw-p-4">
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Header />
      {cartItems.length === 0 ? renderEmptyCart() : renderCartItems()}

      <div className="tw-mt-8">
        {/* Voucher Input */}
        <div className="tw-flex tw-items-center tw-mb-4">
          <input
            type="text"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            placeholder="Enter Voucher Code"
            className="tw-border tw-border-gray-300 tw-py-2 tw-px-4 tw-w-64 tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
          />
          <button
            onClick={handleApplyVoucher}
            className="tw-bg-blue-500 tw-text-white tw-ml-4 tw-py-2 tw-px-6 tw-rounded-lg tw-font-bold hover:tw-bg-blue-600 tw-transition-colors"
          >
            Apply Voucher
          </button>
        </div>

        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        {isVoucherApplied && (
          <p className="tw-text-green-500 tw-mb-4">
            Voucher applied! 5% discount added.
          </p>
        )}

        {/* Total Price */}
        <div className="tw-text-xl tw-font-bold">
          Total Price: ${calculateTotalPrice().toFixed(2)}
        </div>

        {/* Place Order Button */}
        <button
          onClick={() => clickRouteLink("checkout")}
          className="tw-bg-green-500 tw-text-white tw-py-3 tw-px-8 tw-rounded-lg tw-font-bold tw-text-lg tw-mt-6 hover:tw-bg-green-600 tw-transition-colors tw-block tw-w-full tw-text-center"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
