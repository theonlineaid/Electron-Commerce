// src/pages/CartPage.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { removeItem } from '../store/cartSlice';
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
                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
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
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => (
    <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
        <img src={item.image} alt={item.title} className="tw-w-full tw-h-36 tw-object-contain" />
        <div className="tw-p-4">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-2 tw-text-gray-700">{item.title}</h3>
            <p className="tw-text-gray-700 tw-mb-4">${item.price.toFixed(2)}</p>
            <p className="tw-text-gray-700">Quantity: {item.quantity}</p>
            <button
                onClick={() => onRemove(item.id)}
                className="tw-bg-red-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-red-600 tw-mt-4"
            >
                Remove from Cart
            </button>
        </div>
    </div>
);

export default CartPage;