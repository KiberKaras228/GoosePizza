import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './sections/Navbar';
import './App.css';
import Home from './sections/Home';
import Menu from './sections/Menu';
import Cart from './sections/Cart';
import Footer from './sections/Footer';
import Accept from './sections/Accept';
import Perdun from './sections/Perdun'; // Імпортуйте компонент Perdun

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // Стан для корзини
  const [animateCart, setAnimateCart] = useState(false); // Стан для анімації лічильника

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false); // Закриваємо корзину
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Очищення обробника
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Відновити скрол при розмонтуванні
    };
  }, [isCartOpen]);

  // Функція для додавання піци до корзини
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find(
        (item) =>
          item.name === pizza.name &&
          JSON.stringify(item.addons || {}) === JSON.stringify(pizza.addons || {})
      );

      if (existingPizza) {
        // Якщо піца вже є в корзині, збільшуємо її кількість
        return prevCart.map((item) =>
          item.name === pizza.name &&
            JSON.stringify(item.addons || {}) === JSON.stringify(pizza.addons || {})
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Якщо піци немає в корзині, додаємо її з кількістю 1
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
  };

  return (
    <Router>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart} // Передаємо cart в Navbar
        animateCart={animateCart} // Передаємо стан анімації
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Menu addToCart={addToCart} />
              <Cart
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                cart={cart}
                setCart={setCart}
              />
              <Footer />
            </>
          }
        />
        <Route path="/accept" element={<Accept cart={cart} setCart={setCart} />} />
        <Route path="/perdun" element={<Perdun />} />
      </Routes>
    </Router>
  );
}

export default App;
