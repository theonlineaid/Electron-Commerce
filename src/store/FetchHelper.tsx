import { setLoading, setProducts, setSingleProduct } from "./ProductsSlice";
import { AppDispatch } from "./store";


export const fetchProducts = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch(setProducts(data));
    } catch (error) {
        console.error('Failed to fetch products:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchSingleProduct = (productId: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            const data = await response.json();
            dispatch(setSingleProduct(data));
        } catch (error) {
            console.error('Failed to fetch single product:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};
