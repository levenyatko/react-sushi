import {createContext, useReducer} from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item, quantity = 1) => {},
    removeItem: (id) => {},
    clearCart: () => {},
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const quantityToAdd = action.quantity ?? 1;
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );

        const updatedItems = [...state.items]

        if (existingItemIndex > -1) {
            const existingItem = updatedItems[existingItemIndex];

            updatedItems[existingItemIndex] = {
                ...existingItem,
                quality: existingItem.quality + quantityToAdd
            };
        } else {
            updatedItems.push({
                ...action.item,
                quality: quantityToAdd
            });
        }
        return {
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.id
        );

        const updatedItems = [...state.items]
        const existingItem = updatedItems[existingItemIndex];

        if (existingItem.quality === 1) {
           updatedItems.splice(existingItemIndex, 1);
        } else {
            updatedItems[existingItemIndex] = {
                ...existingItem,
                quality: existingItem.quality - 1
            };
        }
        return {
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: [],
        };
    }

    if (action.type === 'SET_PROGRESS') {
        return {
            ...state,
            progress: action.progress
        };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction ] = useReducer(cartReducer, {
        items: [],
        progress: '',
    })

    function addItem(item, quantity = 1) {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item,
            quantity
        });
    }

    function removeItem(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id,
        });
    }

    function clearCart() {
        dispatchCartAction({
            type: 'CLEAR_CART',
        })
    }

    function showCart() {
        dispatchCartAction({
            type: 'SET_PROGRESS',
            progress: 'cart'
        });
    }

    function hideCart() {
        dispatchCartAction({
            type: 'SET_PROGRESS',
            progress: ''
        });
    }

    function showCheckout() {
        dispatchCartAction({
            type: 'SET_PROGRESS',
            progress: 'checkout'
        });
    }

    function hideCheckout() {
        dispatchCartAction({
            type: 'SET_PROGRESS',
            progress: ''
        });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
        progress: cart.progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;