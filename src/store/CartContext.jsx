import {createContext, useReducer} from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );

        const updatedItems = [...state.items]

        if (existingItemIndex > -1) {
            const existingItem = updatedItems[existingItemIndex];

            updatedItems[existingItemIndex] = {
                ...existingItem,
                quality: existingItem.quality + 1
            };
        } else {
            updatedItems.push({
                ...action.item,
                quality: 1
            });
        }
        return {
            ...state,
            items: updatedItems,
        };
    } else if (action.type === 'REMOVE_ITEM') {
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

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction ] = useReducer(cartReducer, {
        items: [],
    })

    function addItem(item) {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item,
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

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;