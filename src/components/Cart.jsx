import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
export default function Cart() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = cartContext.items.reduce((total, item) => total + item.quality * item.price, 0);

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleShowCheckout() {
        userProgressContext.showCheckout();
    }

    return (
        <Modal
            open={userProgressContext.progress === 'cart'}
            onClose={ userProgressContext.progress === 'cart' ? handleCloseCart : null}
        >
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
            <ul className="divide-y divide-gray-200 mb-4">
                {cartContext.items.map(item => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quality}
                        onInrease={() => cartContext.addItem(item)}
                        onDecrease={() => cartContext.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="flex items-center justify-between mt-2 text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">{currencyFormatter.format(cartTotal)}</span>
            </p>
            <div className="mt-6 flex justify-end gap-2">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                { cartContext.items.length > 0 && <Button onClick={handleShowCheckout}>Go to checkout</Button>}
            </div>
        </Modal>
    );
}