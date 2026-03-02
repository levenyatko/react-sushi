import { useContext } from "react";

import logoImg from '../assets/logo.jpg';
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const totalCartItems = cartContext.items.reduce((total, item) => total + item.quality, 0);

    function handleShowCart() {
        userProgressContext.showCart();
    }

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A plate with food on it" />
            <h1>React Food Order</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
    </header>;
}