import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {

    const {data: meals, error, isLoading} = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Loading...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error.message} />
    }

    return <ul id="meals">
        {meals.map(meal => <MealItem key={meal.id} meal={meal} />)}
    </ul>;
}