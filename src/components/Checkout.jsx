import {useContext, useActionState} from "react";

import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.js";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import {currencyFormatter} from "../util/formatting.js";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

export default function Checkout() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const {data, error, sendRequest, clearData} = useHttp(`${import.meta.env.VITE_API_URL}/orders`, requestConfig);

    const cartTotal = cartContext.items.reduce((total, item) => total + item.quality * item.price, 0);

    function handleCloseCheckout() {
        userProgressContext.hideCheckout();
    }

    async function checkoutAction(prevState, formData) {
        const customerData = Object.fromEntries(formData.entries());

        await sendRequest(JSON.stringify({
            order: {
                customer: customerData,
                items: cartContext.items,
            }
        }));
    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null);

    function handleFinishCheckout() {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }

    let actions = (
        <div className="mt-6 flex justify-end gap-2">
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button>Confirm</Button>
        </div>
    );

    if (isSending) {
        actions = <span>Sending...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
                <h2 className="text-lg font-semibold mb-2">Success!</h2>
                <p className="text-sm text-gray-700">Thank you for your order!</p>
                <p className="text-sm text-gray-700">Your order number is: #12233</p>
                <p className="text-sm text-gray-700">We will get back to you with more details via email within the next few minutes</p>
                <div className="mt-6 flex justify-end">
                    <Button textOnly onClick={handleCloseCheckout}>Ok</Button>
                </div>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form action={formAction} className="space-y-4">
                <h2 className="text-lg font-semibold">Checkout</h2>
                <p className="text-sm flex items-center justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-medium">{ currencyFormatter.format(cartTotal) }</span>
                </p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                { error && <Error title="Failed to submit order" message={error.message} />}

                {actions}
            </form>
        </Modal>
    );
}