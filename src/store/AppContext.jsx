import {createContext, useState, useCallback, useContext, useEffect} from 'react';
import useHttp from "../hooks/useHttp.js";

const AppContext = createContext({
    restaurant: {
        name: '',
        address: '',
        currency: 'USD'
    },
    isLoading: false,
    error: null,
    setRestaurant: (restaurant) => {}
});

const requestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

export function AppContextProvider({ children }) {
    const [restaurant, setRestaurantData] = useState(() => {
        const cachedRestaurant = localStorage.getItem('restaurant');
        return cachedRestaurant ? JSON.parse(cachedRestaurant) : {
            name: '',
            address: '',
            currency: 'USD'
        };
    });

    const { data: restaurantData, error, isLoading } = useHttp(`${import.meta.env.VITE_API_URL}/restaurant`, requestConfig);

    useEffect(() => {
        if (restaurantData) {
            setRestaurantData(restaurantData);
            localStorage.setItem('restaurant', JSON.stringify(restaurantData));
        }
    }, [restaurantData]);

    const setRestaurant = useCallback((restaurantData) => {
        setRestaurantData(restaurantData);
        localStorage.setItem('restaurant', JSON.stringify(restaurantData));
    }, []);

    const appContext = {
        restaurant,
        isLoading: isLoading && !restaurant.name, // Only loading if we don't have cached data
        error,
        setRestaurant
    };

    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;
