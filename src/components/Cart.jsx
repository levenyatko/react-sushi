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

    return <Modal className="cart"
                  open={userProgressContext.progress === 'cart'}
                  onClose={ userProgressContext.progress === 'cart' ? handleCloseCart : null}
        >
        <h2>Your Cart</h2>
        <ul>
            {cartContext.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quality}
                    onInrease={() => cartContext.addItem(item)}
                    onDecrease={() => cartContext.removeItem(item.id)}
                />
            )
            )}
        </ul>
        <p>Total: {currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            { cartContext.items.length > 0 && <Button onClick={handleShowCheckout}>Go to checkout</Button>}
        </p>
    </Modal>;
}