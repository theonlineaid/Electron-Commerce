import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem type
export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
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
        
            // Ensure the payload quantity is a positive number, and default to 1 if not provided
            const payloadQuantity = action.payload.quantity && action.payload.quantity > 0 
                ? action.payload.quantity 
                : 1;
        
            if (existingItem) {
                // If the item exists, only increment its quantity by the payload quantity
                existingItem.quantity += payloadQuantity;
            } else {
                // If the item is new, ensure the quantity is set properly
                state.items.push({ ...action.payload, quantity: payloadQuantity });
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1; // Increment the quantity
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrement the quantity if it's greater than 1
            }
        },
    },
});

export const { addToCart, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
