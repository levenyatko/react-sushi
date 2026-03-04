import {useContext} from "react";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import AppContext, {AppContextProvider} from "./store/AppContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function AppContent() {
    const {isLoading} = useContext(AppContext);

    if (isLoading) {
        return <Loader message="Loading restaurant info..." />;
    }

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto px-4">
                <Meals />
                <Cart/>
                <Checkout/>
            </div>
        </>
    );
}

function App() {
  return (
      <div className="min-h-screen bg-white text-gray-900">
          <AppContextProvider>
              <CartContextProvider>
                  <AppContent />
              </CartContextProvider>
          </AppContextProvider>
      </div>
  );
}

export default App;
