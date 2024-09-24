// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem type
export interface CartItem {
    id: string; // Unique identifier for the item
    title: string; // Title of the item
    price: number; // Price of the item
    quantity: number; // Quantity of the item in the cart
    image: string; // Image URL of the item
}

interface CartState {
    items: CartItem[]; // Use the CartItem type
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
