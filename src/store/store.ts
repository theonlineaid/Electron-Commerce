import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './ProductsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // The key in localStorage
    storage,     // The storage engine, defaults to localStorage
};

// Combine the reducers for products and cart
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
});

// Wrap rootReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    // You can add middleware if needed (e.g., serializableCheck for redux-persist)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the check for non-serializable values
        }),
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the persistor for use in the application entry point
export const persistor = persistStore(store);

// Export the store
export default store;
