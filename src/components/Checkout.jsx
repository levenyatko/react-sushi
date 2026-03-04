import {useContext, useActionState, useState} from "react";

import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.js";
import CartContext from "../store/CartContext.jsx";
import AppContext from "../store/AppContext.jsx";
import {formatCurrency} from "../util/formatting.js";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

export default function Checkout() {
    const cartContext = useContext(CartContext);
    const { restaurant } = useContext(AppContext);

    const [deliveryMethod, setDeliveryMethod] = useState('address');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const generateTimeSlots = () => {
        const slots = [];
        const now = new Date();
        const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now

        // Round up to the next 20 minutes
        const minutes = start.getMinutes();
        const roundedMinutes = Math.ceil(minutes / 20) * 20;
        start.setMinutes(roundedMinutes, 0, 0);

        const end = new Date();
        end.setHours(22, 0, 0, 0);

        while (start < end) {
            const slotStart = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            start.setMinutes(start.getMinutes() + 20);
            const slotEnd = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            
            if (start <= end) {
                slots.push(`${slotStart}-${slotEnd}`);
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    const {data, error, sendRequest, clearData} = useHttp(`${import.meta.env.VITE_API_URL}/orders`, requestConfig);

    const cartTotal = cartContext.items.reduce((total, item) => total + item.quality * item.price, 0);

    function handleCloseCheckout() {
        cartContext.hideCheckout();
    }

    async function checkoutAction(prevState, fd) {
        const customerData = Object.fromEntries(fd.entries());

        const orderItems = cartContext.items.map(item => ({
            id: item.id,
            quantity: item.quality
        }));

        sendRequest(JSON.stringify({
            order: {
                customer: customerData,
                items: orderItems,
                total: cartTotal,
                deliveryMethod,
                paymentMethod
            }
        }));

        return { success: true };
    }

    const [formState, formAction, isSending] = useActionState(checkoutAction,null);

    function handleFinish() {
        cartContext.clearCart();
        handleCloseCheckout();
        clearData();
    }

    if (data && !error) {
        return (
            <Modal open={cartContext.progress === 'checkout'} onClose={handleFinish} className="p-0 overflow-hidden">
                <div className="flex flex-col h-full max-h-[80vh]">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Success!</h2>
                        <button onClick={handleFinish} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 space-y-4">
                        <p className="text-lg font-medium text-gray-900">Thank you for your order!</p>
                        <p className="text-gray-600">Your order number is: <span className="font-bold text-gray-900">#{data.id}</span></p>
                        <p className="text-gray-600 italic">We will get back to you with more details via email within the next few minutes</p>
                    </div>
                    <div className="p-6 border-t bg-gray-50 flex justify-end">
                        <Button onClick={handleFinish} classNames="px-8 py-2.5">Ok</Button>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal
            open={cartContext.progress === 'checkout'}
            onClose={cartContext.progress === 'checkout' ? handleCloseCheckout : null}
            className="p-0 overflow-hidden"
        >
            <form action={formAction} method="POST" className="flex flex-col h-full max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Checkout</h2>
                    <button type="button" onClick={handleCloseCheckout} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    <div className="flex items-center justify-between bg-brand/5 p-4 rounded-lg border border-brand/10">
                        <span className="text-lg font-medium text-gray-600">Total Amount</span>
                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(cartTotal, restaurant.currency)}</span>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
                        <Input label="Full Name" type="text" id="name" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Email" type="email" id="email" />
                            <Input label="Phone Number" type="tel" id="phone" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Delivery Details</h3>
                        <div className="flex gap-4 p-1 bg-gray-100 rounded-lg w-fit">
                            <button
                                type="button"
                                onClick={() => setDeliveryMethod('address')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${deliveryMethod === 'address' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Address
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Pick-up
                            </button>
                        </div>
                        <input type="hidden" name="deliveryMethod" value={deliveryMethod} />

                        {deliveryMethod === 'address' ? (
                            <div className="space-y-4">
                                <Input label="Delivery address" type="text" id="address" />
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p className="text-sm font-medium text-gray-700">Pick-up from:</p>
                                <p className="text-sm text-gray-600">{restaurant.address}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Number of Persons" type="number" id="persons" min="1" defaultValue="1" />
                            <div className="flex flex-col gap-1">
                                <label htmlFor="delivery-time" className="text-sm text-gray-700">Schedule Delivery Time</label>
                                <select
                                    id="delivery-time"
                                    name="delivery-time"
                                    required
                                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-transparent bg-white"
                                >
                                    <option value="">Select a slot</option>
                                    {timeSlots.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="comment" className="text-sm text-gray-700">Comment</label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows="3"
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-transparent"
                            ></textarea>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-brand bg-brand/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                    className="accent-brand"
                                />
                                <span className="text-sm font-medium">Card to courier</span>
                            </label>
                            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-brand bg-brand/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                    className="accent-brand"
                                />
                                <span className="text-sm font-medium">Cash</span>
                            </label>
                        </div>

                        {paymentMethod === 'cash' && (
                            <Input label="Prepare a change from" type="number" id="change-from" min={cartTotal} step="0.01" />
                        )}
                    </div>

                    <div className="space-y-4 pt-2 border-t">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="privacy"
                                required
                                className="mt-1 accent-brand w-4 h-4"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-tight">
                                I have read and agree to the <a href="#" className="text-brand hover:underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</a> and <a href="#" className="text-brand hover:underline" onClick={(e) => e.stopPropagation()}>Terms of Service</a>.
                            </span>
                        </label>
                    </div>
                </div>

                <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    {error && <Error title="Failed to submit order" message={error} />}

                    <Button disabled={isSending} classNames="px-10 py-2.5 text-base">
                        {isSending ? 'Submitting...' : 'Confirm Order'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}