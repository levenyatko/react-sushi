import {currencyFormatter, getImageUrl} from "../util/formatting.js";
import CartItemQuantity from "./CartItemQuantity.jsx";
import Button from "./UI/Button.jsx";

export default function MealItemDetails({ meal, quantity, setQuantity, isAdded, handleAddToCart, handleCloseModal}) {
    const imagePath = getImageUrl(meal.image);

    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 h-64 md:h-auto">
                <img src={imagePath} alt={meal.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold">{meal.name}</h2>
                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                                {meal.weight}
                            </span>
                    {meal.tags && meal.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-brand/10 text-brand rounded-full font-medium">
                                    {tag}
                                </span>
                    ))}
                </div>

                <p className="text-gray-700 mb-6 flex-1">{meal.description}</p>

                {meal.allergens && meal.allergens.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Allergens</h4>
                        <p className="text-sm text-gray-600">{meal.allergens.join(', ')}</p>
                    </div>
                )}

                <div className="mt-auto border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold">{currencyFormatter.format(meal.price)}</span>
                        <CartItemQuantity
                            quantity={quantity}
                            handleIncrement={() => { setQuantity(prev => prev + 1) }}
                            handleDecrement={() => { setQuantity(prev => prev > 1 ? prev - 1 : 1) }}
                        />
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        classNames={`w-full justify-center py-3 text-base ${isAdded ? "bg-green-600 border-green-600 hover:bg-green-700" : ""}`}
                    >
                        {isAdded ? "Added to Cart" : `Add ${quantity} to Cart — ${currencyFormatter.format(meal.price * quantity)}`}
                    </Button>
                </div>
            </div>
        </div>
    );
}