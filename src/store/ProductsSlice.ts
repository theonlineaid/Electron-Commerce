import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from './types';

const initialState: ProductsState = {
  items: [],
  loading: false,
  singleProduct: null, // Add a state for the single product
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSingleProduct: (state, action: PayloadAction<Product | null>) => {
      state.singleProduct = action.payload; // Set the single product
    },
  },
});

export const { setProducts, setLoading, setSingleProduct } = productsSlice.actions;
export default productsSlice.reducer;
