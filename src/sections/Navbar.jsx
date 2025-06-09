import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Імпортуємо Link для маршрутизації
import logo from '../assets/Logo.png';
import { MdMenu } from "react-icons/md";

export default function Navbar({ isMenuOpen, setIsMenuOpen, isCartOpen, setIsCartOpen, cart, animateCart }) {
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }, [isMenuOpen]);

    return (
        <nav className='fixed top-0 w-full z-40 bg[rgba(10,10,10, 0.8)]
         backdrop-blur-lg px-1 border-b border-white/10 shadow-lg '>
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center font-mono h-16">
                    {/* Логотип із маршрутом на головну сторінку */}
                    <Link to="/">
                        <img src={logo} alt="Logo" className="cursor-pointer" />
                    </Link>

                    {!isMenuOpen &&
                        <div onClick={() => setIsMenuOpen(prev => !prev)} className="text-2xl absolute 
                    right-7 z-40 md:hidden cursor-pointer font-mono">
                            <MdMenu className='text-red-500' />
                        </div>}

                    <div className="flex md:flex items-center space-x-8">
                        <div className="hidden md:flex items-center space-x-8">
                            {/* Кнопки навігації з маршрутизацією */}
                            <Link to="/" className="text-red-500 text-lg hover:text-xl hover:text-red-600 transition-all">
                                Home
                            </Link>

                            <Link to="/" className="text-red-500 text-lg hover:text-xl hover:text-red-600 transition-all">
                                Order
                            </Link>

                            <Link to="/" className="text-red-500 text-lg hover:text-xl hover:text-red-600 transition-all">
                                Contact
                            </Link>

                            {/* Кнопка відкриття корзини */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="text-red-500 text-lg hover:text-xl hover:text-red-600 transition-all relative"
                            >
                                Корзина 🛒
                                {cart.length > 0 && (
                                    <span
                                        className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full ${animateCart ? 'animate-bounce' : ''
                                            }`}
                                    >
                                        {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
