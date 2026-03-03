export default function CartItemQuantity({ quantity, handleIncrement, handleDecrement }) {

    return (
        <div className="flex items-center border rounded-md">
            <button
                onClick={handleDecrement}
                className="px-3 py-1 hover:bg-gray-100 text-lg font-medium"
            >
                −
            </button>
            <span className="px-4 py-1 font-semibold">{quantity}</span>
            <button
                onClick={handleIncrement}
                className="px-3 py-1 hover:bg-gray-100 text-lg font-medium"
            >
                +
            </button>
        </div>
    );
}