import { currencyFormatter } from "../util/formatting.js";

export default function CartItem({ name, price, quantity, onInrease, onDecrease}) {
    return (
        <li className="cart-item">
            <p>
                <span>{name}</span>
                <span>{quantity}</span>
                <span>{price}</span>
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onInrease}>+</button>
            </p>
        </li>
    );
}