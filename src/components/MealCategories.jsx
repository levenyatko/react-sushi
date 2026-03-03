import Button from "./UI/Button.jsx";
import {useState, useEffect} from "react";

export default function MealCategories({ groupedMeals, categoryRefs }) {
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategoryId(Number(entry.target.dataset.categoryId));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(categoryRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, [groupedMeals]);


    function handleScrollToCategory(categoryId) {
        const offset = 80; // height of the sticky header
        const element = categoryRefs.current[categoryId];
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    return (
        <ul className="space-y-2">
            {groupedMeals.map(category => (
                <li key={category.id}>
                    <Button
                        textOnly
                        onClick={() => handleScrollToCategory(category.id)}
                        classNames={`${
                            activeCategoryId === category.id
                                ? "text-white bg-brand hover:bg-brand-medium border border-brand"
                                : ""
                        }`}
                    >
                        {category.name}
                    </Button>
                </li>
            ))}
        </ul>
    );
}