import {useRef} from "react";

import useHttp from "../hooks/useHttp.js";

import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";
import MealCategories from "./MealCategories.jsx";

const requestConfig = {};

export default function Meals() {
    const categoryRefs = useRef({});

    const { data: menuData, error, isLoading } = useHttp(`${import.meta.env.VITE_API_URL}/menu`, requestConfig, []);

    if (isLoading) {
        return <Loader message="Loading meals..." />;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error.message} />
    }

    const categories = menuData.categories ?? [];
    const items = menuData.items ?? [];
    const tags = menuData.tags ?? [];

    const groupedMeals = categories.map(category => ({
        ...category,
        meals: items.filter(item => item.category_id === category.id).map(meal => ({
            ...meal,
            tags: meal.tags.map(tagId => tags.find(t => t.id === tagId)?.name).filter(Boolean)
        }))
    })).filter(category => category.meals.length > 0);

    return (
        <div className="flex flex-col md:flex-row gap-8 my-8 relative">
            <aside className="md:w-1/4">
                <nav className="sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <MealCategories groupedMeals={groupedMeals} categoryRefs={categoryRefs} />
                </nav>
            </aside>
            <main className="md:w-3/4">
                {groupedMeals.map(category => (
                    <section
                        key={category.id}
                        id={`category-${category.id}`}
                        ref={el => categoryRefs.current[category.id] = el}
                        data-category-id={category.id}
                        className="mb-12 scroll-mt-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-100">
                            {category.name}
                        </h2>
                        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                            {category.meals.map(meal => (
                                <MealItem key={meal.id} meal={meal} />
                            ))}
                        </ul>
                    </section>
                ))}
            </main>
        </div>
    );
}