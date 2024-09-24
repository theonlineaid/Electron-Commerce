// src/pages/CartPage.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { removeItem, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const CartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

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
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
                <CartItem 
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
            <div className="tw-mt-4 tw-text-lg tw-font-bold">
                Total Price: ${calculateTotalPrice().toFixed(2)}
            </div>
        </div>
    );
};

// Cart item component
interface CartItemProps {
    item: {
        id: string;
        image: string;
        title: string;
        price: number;
        quantity: number;
    };
    onRemove: (id: string) => void;
    onIncrement: (id: string) => void; // New prop for increment
    onDecrement: (id: string) => void; // New prop for decrement
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onIncrement, onDecrement }) => (
    <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
        <img src={item.image} alt={item.title} className="tw-w-full tw-h-36 tw-object-contain" />
        <div className="tw-p-4">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-2 tw-text-gray-700">{item.title}</h3>
            <p className="tw-text-gray-700 tw-mb-4">${item.price.toFixed(2)}</p>
            <p className="tw-text-gray-700">Quantity: {item.quantity}</p>
            <div className="tw-flex tw-space-x-2 tw-mt-2">
                <button
                    onClick={() => onDecrement(item.id)} // Decrement quantity
                    className="tw-bg-gray-300 tw-text-black tw-py-1 tw-px-3 tw-rounded hover:tw:bg-gray-400"
                >
                    -
                </button>
                <button
                    onClick={() => onIncrement(item.id)} // Increment quantity
                    className="tw-bg-gray-300 tw-text-black tw-py-1 tw-px-3 tw-rounded hover:tw:bg-gray-400"
                >
                    +
                </button>
            </div>
            <button
                onClick={() => onRemove(item.id)}
                className="tw-bg-red-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw:bg-red-600 tw-mt-4"
            >
                Remove from Cart
            </button>
        </div>
    </div>
);

export default CartPage;
