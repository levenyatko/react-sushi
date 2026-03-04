import { formatCurrency, getImageUrl } from "../util/formatting.js";
import CartItemQuantity from "./CartItemQuantity.jsx";
import {useContext} from "react";
import AppContext from "../store/AppContext.jsx";

export default function CartItem({ name, price, quantity, image, onInrease, onDecrease}) {
    const { restaurant } = useContext(AppContext);
    const imagePath = getImageUrl(image);

    function handleDecrease() {
        if (quantity === 1) {
            if (window.confirm(`Are you sure you want to remove ${name} from the cart?`)) {
                onDecrease();
            }
        } else {
            onDecrease();
        }
    }

    return (
        <li className="py-4 flex items-center gap-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={imagePath} alt={name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col">
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{formatCurrency(price, restaurant.currency)}</p>
            </div>
            <div className="flex items-center">
                <CartItemQuantity
                    quantity={quantity}
                    handleIncrement={onInrease}
                    handleDecrement={handleDecrease}
                />
            </div>
        </li>
    );
}