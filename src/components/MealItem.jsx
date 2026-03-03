import { useContext, useState, useEffect } from "react";

import {currencyFormatter, getImageUrl} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import MealItemDetails from "./MealItemDetails.jsx";

export default function MealItem({ meal }) {
    const cartContext = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    function handleAddToCart() {
        for (let i = 0; i < quantity; i++) {
            cartContext.addItem(meal);
        }
        setIsAdded(true);
    }

    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => {
                setIsAdded(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setQuantity(1);
    }

    const imagePath = getImageUrl(meal.image);

    return (
        <>
            <li className="group cursor-pointer" onClick={handleOpenModal}>
                <article className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md h-full">
                    <div className="relative h-40 overflow-hidden">
                        <img src={imagePath} alt={meal.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                        <h3 className="text-base font-semibold">{meal.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                                {meal.weight}
                            </span>
                            {meal.tags && meal.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 bg-brand/10 text-brand rounded-full font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <p className="text-sm font-bold text-gray-900">{currencyFormatter.format(meal.price)}</p>
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart();
                                }}
                                classNames={isAdded ? "bg-green-600 border-green-600 hover:bg-green-700" : ""}
                            >
                                {isAdded ? "Added" : "Add to Cart"}
                            </Button>
                        </div>
                    </div>
                </article>
            </li>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
               <MealItemDetails 
                   meal={meal} 
                   quantity={quantity} 
                   setQuantity={setQuantity} 
                   isAdded={isAdded} 
                   handleAddToCart={handleAddToCart}
                   handleCloseModal={handleCloseModal}
               />
            </Modal>
        </>
    );
}