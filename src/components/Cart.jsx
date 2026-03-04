import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import {formatCurrency} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import AppContext from "../store/AppContext.jsx";
import CartItem from "./CartItem.jsx";
export default function Cart() {
    const cartContext = useContext(CartContext);
    const { restaurant } = useContext(AppContext);

    const cartTotal = cartContext.items.reduce((total, item) => total + item.quality * item.price, 0);

    function handleCloseCart() {
        cartContext.hideCart();
    }

    function handleShowCheckout() {
        cartContext.showCheckout();
    }

    return (
        <Modal
            open={cartContext.progress === 'cart'}
            onClose={ cartContext.progress === 'cart' ? handleCloseCart : null}
            className="p-0 overflow-hidden"
        >
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button onClick={handleCloseCart} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {cartContext.items.length === 0 && (
                        <p className="text-center text-gray-500 py-8 italic">Your cart is empty.</p>
                    )}
                    <ul className="divide-y divide-gray-100">
                        {cartContext.items.map(item => (
                            <CartItem
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quality}
                                image={item.image}
                                onInrease={() => cartContext.addItem(item)}
                                onDecrease={() => cartContext.removeItem(item.id)}
                            />
                        ))}
                    </ul>
                </div>

                <div className="p-6 border-t bg-gray-50">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-lg font-medium text-gray-600">Total Amount</span>
                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(cartTotal, restaurant.currency)}</span>
                    </div>
                    <div className="flex justify-end gap-3">
                        {cartContext.items.length > 0 && (
                            <Button onClick={handleShowCheckout} classNames="px-8 py-2.5 text-base">
                                Go to Checkout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}