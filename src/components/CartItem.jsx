import { currencyFormatter } from "../util/formatting.js";

export default function CartItem({ name, price, quantity, onInrease, onDecrease}) {
    return (
        <li className="py-3 flex items-center justify-between">
            <div className="flex-1">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-gray-600">{quantity} × {currencyFormatter.format(price)}</p>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onDecrease} className="h-7 w-7 inline-flex items-center justify-center rounded border border-gray-300 text-sm">-</button>
                <span className="w-6 text-center text-sm">{quantity}</span>
                <button onClick={onInrease} className="h-7 w-7 inline-flex items-center justify-center rounded border border-gray-300 text-sm">+</button>
            </div>
        </li>
    );
}