import { useContext } from "react";

import { ShoppingCart } from "lucide-react";

import logoImg from '../assets/logo.png';
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

    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={logoImg} alt="Panda sushi" className="h-8 object-contain" />
                    <h1 className="text-l font-bold tracking-tight">Panda Sushi</h1>
                </div>
                <Button textOnly onClick={handleShowCart}>
                    <ShoppingCart className="w-4 h-4" />
                    Cart
                    {totalCartItems > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 text-[10px] bg-black text-white rounded-full px-1.5">
                          {totalCartItems}
                        </span>
                    )}
                </Button>
            </div>
        </header>
    );
}