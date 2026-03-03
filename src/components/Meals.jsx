import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {

    const {data: menuData, error, isLoading} = useHttp('http://localhost:3000/menu', requestConfig, []);

    if (isLoading) {
        return <p className="text-center text-sm text-gray-600 py-8">Loading...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error.message} />
    }

    const meals = menuData.items ?? [];

    return (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8">
            {meals.map(meal => <MealItem key={meal.id} meal={meal} />)}
        </ul>
    );
}