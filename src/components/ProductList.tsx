import React, { useEffect } from 'react';
import { addToCart } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchProducts } from '../store/FetchHelper';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.items);
    const loading = useAppSelector(state => state.products.loading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="tw-container tw-mx-auto tw-p-2">
            <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">Products</h2>

            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                {products.map(product => (
                    <div key={product.id} className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
                        <img src={product.image} alt={product.title} className="tw-w-full tw-h-36 tw-object-contain" />
                        <div className="tw-p-4">
                            <h3 className="tw-text-lg tw-font-semibold tw-mb-2 tw-text-gray-700">{product.title.substring(0, 29)}</h3>
                            <p className="tw-text-gray-700 tw-mb-4">{product.description.substring(0, 70)}...</p>
                            <p className="tw-font-bold tw-text-xl tw-mb-4 tw-text-gray-700">${product.price.toFixed(2)}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-blue-600"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ProductList;
