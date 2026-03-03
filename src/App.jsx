import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return (
      <div className="min-h-screen bg-white text-gray-900">
          <UserProgressContextProvider>
              <CartContextProvider>
                  <Header />
                  <div className="max-w-6xl mx-auto px-4">
                      <Meals />
                      <Cart/>
                      <Checkout/>
                  </div>
              </CartContextProvider>
          </UserProgressContextProvider>
      </div>
  );
}

export default App;
