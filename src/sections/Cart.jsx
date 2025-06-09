import React from 'react';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Cart({ isCartOpen, setIsCartOpen, cart = [], setCart }) {
    const navigate = useNavigate();

    const handleOrder = () => {
        setIsCartOpen(false); // Закриваємо корзину
        navigate('/accept'); // Переходимо на сторінку оформлення замовлення
    };

    if (!isCartOpen) return null;

    const updateAddon = (index, addon, change) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index) {
                const updatedAddons = {
                    ...item.addons,
                    [addon]: Math.max((item.addons?.[addon] || 0) + change, 0),
                };

                // Оновлюємо ціну товару
                const addonPriceChange = change * getAddonPrice(addon);
                const updatedPrice = item.price + addonPriceChange;

                return {
                    ...item,
                    addons: updatedAddons,
                    price: updatedPrice,
                };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const getAddonPrice = (addon) => {
        const addonPrices = {
            cheese: 20,
            mushrooms: 25,
            bacon: 30,
        };
        return addonPrices[addon] || 0;
    };

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            setIsCartOpen(false); // Закриваємо корзину
        }
    };

    const removePizza = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index)); // Видаляємо піцу за індексом
    };

    return (
        <div
            className="fixed inset-0 h-full bg-black/50 flex justify-end z-50"
            onClick={handleBackgroundClick} // Додаємо обробник кліку
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Корзина</h2>
                {cart.length === 0 ? (
                    <p>Корзина порожня</p>
                ) : (
                    <>
                        <h1>Кількість товарів: {cart.length}</h1>
                        <ul className="max-h-96 overflow-y-auto">
                            {cart.map((item, index) => (
                                <li key={index} className="relative flex flex-col mb-4 p-4 shadow-md rounded-lg">
                                    <button
                                        onClick={() => removePizza(index)} // Видаляємо піцу
                                        className="absolute top-2 right-2 text-2xl rounded-full shadow-md shadow-black/30 p-1"
                                    >
                                        <IoIosClose />

                                    </button>
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold">{item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {item.addons &&
                                                    Object.entries(item.addons).map(([addon, count]) => (
                                                        <span key={addon} className="flex items-center justify-end w-full">
                                                            <span className="flex-1">{addon} x{count}</span>
                                                            <div className="flex items-center space-x-2 ml-8">
                                                                <button
                                                                    onClick={() => updateAddon(index, addon, -1)}
                                                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                                >
                                                                    -
                                                                </button>
                                                                <button
                                                                    onClick={() => updateAddon(index, addon, 1)}
                                                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </span>
                                                    ))}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-orange-500 font-bold">{item.price * (item.quantity || 1)} ₴</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => {
                                                    const updatedCart = cart.map((cartItem, i) =>
                                                        i === index
                                                            ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                                                            : cartItem
                                                    );
                                                    setCart(updatedCart);
                                                }}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button
                                                onClick={() => {
                                                    const updatedCart = cart.map((cartItem, i) =>
                                                        i === index
                                                            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                                                            : cartItem
                                                    );
                                                    setCart(updatedCart);
                                                }}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex items-center justify-center">
                            <button
                                onClick={handleOrder}
                                className="w-[75%] px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
                            >
                                Оформити замовлення {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)} ₴
                            </button>
                        </div>
                    </>
                )}
                <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Закрити
                </button>
            </div>
        </div>
    );
}
