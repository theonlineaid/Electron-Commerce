import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../store/FetchHelper';
import { useAppDispatch, useAppSelector } from '../store/store';


const SingleProduct: React.FC = () => {
    const { productId } = useParams<{ productId: any }>();
    const dispatch = useAppDispatch();
    const singleProduct = useAppSelector(state => state.products.singleProduct);
    const loading = useAppSelector(state => state.products.loading);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch, productId]);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (!singleProduct) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="tw-container tw-mx-auto tw-p-4">
            <h1 className="tw-text-3xl tw-font-bold">{singleProduct.title}</h1>
            <img src={singleProduct.image} alt={singleProduct.title} className="tw-w-full tw-h-auto" />
            <p className="tw-mt-4">{singleProduct.description}</p>
            <p className="tw-font-bold tw-text-xl tw-mt-2">${singleProduct.price.toFixed(2)}</p>
        </div>
    );
};

export default SingleProduct;
