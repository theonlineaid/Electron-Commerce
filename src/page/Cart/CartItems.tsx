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

const CartItems: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}) => (
  <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
    <img
      src={item.image}
      alt={item.title}
      className="tw-w-full tw-h-36 tw-object-contain"
    />
    <div className="tw-p-4">
      <h3 className="tw-text-lg tw-font-semibold tw-mb-2 tw-text-gray-700">
        {item.title}
      </h3>
      <p className="tw-text-gray-700 tw-mb-4">${item.price.toFixed(2)}</p>
      <p className="tw-text-gray-700">Quantity: {item.quantity}</p>
      <div className="tw-flex tw-space-x-2 tw-mt-2">
        <button
          onClick={() => onDecrement(item.id)} // Decrement quantity
          className="tw-bg-gray-300 tw-text-black tw-py-1 tw-px-3 tw-rounded hover:tw-bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() => onIncrement(item.id)} // Increment quantity
          className="tw-bg-gray-300 tw-text-black tw-py-1 tw-px-3 tw-rounded hover:tw-bg-gray-400"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="tw-bg-red-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-red-600 tw-mt-4"
      >
        Remove from Cart
      </button>
    </div>
  </div>
);

export default CartItems;
