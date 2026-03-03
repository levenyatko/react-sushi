import { useContext } from "react";

import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal }) {
    const cartContext = useContext(CartContext);

    function handleAddToCart() {
        cartContext.addItem(meal);
    }

    const imagePath = meal.image.startsWith('http') 
        ? meal.image 
        : `${import.meta.env.VITE_IMAGE_CDN_URL}/${meal.image}`;

    return (
        <li>
            <article className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
                <img src={imagePath} alt={meal.name} className="h-40 w-full object-cover" />
                <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-medium">{meal.name}</h3>
                    <p className="text-sm text-gray-700">{meal.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                        <p className="text-sm font-semibold">{currencyFormatter.format(meal.price)}</p>
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>
            </article>
        </li>
    );
}