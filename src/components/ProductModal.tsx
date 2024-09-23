import React from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold">{product.title}</h2>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                <p className="mt-2">{product.description}</p>
                <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
