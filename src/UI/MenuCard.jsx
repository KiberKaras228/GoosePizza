import React, { useState, useEffect } from 'react';
import capricossia from '../assets/capricossia.webp';
import carbonara from '../assets/carbonara.webp';
import cezar from '../assets/cezar.webp';
import felicita from '../assets/felicita.webp';
import gawai from '../assets/gawai.webp';
import mushrooms from '../assets/mushrooms.webp';
import quattro from '../assets/quattro.webp';
import salame from '../assets/salame.webp';
import { IoCheckmarkDone } from "react-icons/io5";

function AddModal({ onClose, selectedPizza, setSelectedPizza, addToCart }) {
    const [count, setCount] = useState({ cheese: 0, mushrooms: 0, bacon: 0 });

    const counter = (addon) => {
        setCount((prevCounts) => ({
            ...prevCounts,
            [addon]: prevCounts[addon] + 1,
        }));
    };

    const handleAddonClick = (amount, addon) => {
        setSelectedPizza((prev) => ({
            ...prev,
            price: prev.price + amount,
            addons: {
                ...prev.addons,
                [addon]: (prev.addons?.[addon] || 0) + 1,
            },
        }));
        counter(addon);
    };

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose(); // Закриваємо модальне вікно
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            onClick={handleBackgroundClick} // Додаємо обробник кліку
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl text-center">
                <h2 className="text-xl font-bold mb-4">Добавки до {selectedPizza.name} 🍕</h2>
                <img src={selectedPizza.image} className="w-[300px]" alt="" />
                <ul className="text-left flex gap-2">
                    <li>
                        <button
                            type="button"
                            onClick={() => handleAddonClick(20, 'cheese')}
                            className="border border-orange-400 p-3 hover:bg-red-600/80 transition"
                        >
                            🧀 Сир (+20 грн) {count.cheese}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => handleAddonClick(25, 'mushrooms')}
                            className="border border-orange-400 p-3 hover:bg-red-600/80 transition"
                        >
                            🍄 Гриби (+25 грн) {count.mushrooms}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => handleAddonClick(30, 'bacon')}
                            className="border border-orange-400 p-3 hover:bg-red-600/80 transition"
                        >
                            🥓 Бекон (+30 грн) {count.bacon}
                        </button>
                    </li>
                </ul>
                <p className="mt-4 font-bold text-lg">Загальна ціна: {selectedPizza.price} грн</p>
                <button
                    type="button"
                    onClick={() => {
                        addToCart({ ...selectedPizza, addons: count }); // Передаємо піцу з добавками
                        onClose(); // Закриваємо модальне вікно
                    }}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    В корзину
                </button>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg ml-1"
                >
                    Закрити
                </button>
            </div>
        </div>
    );
}

export default function MenuCard({ addToCart }) {
    const [pizza] = useState([
        {
            image: capricossia,
            name: 'Capricossia',
            brief: 'Маргарита за традиційним італійським рецептом...',
            price: 180,
        },
        {
            image: carbonara,
            name: 'Carbonara',
            brief: 'Капричоза - вибір європейців...',
            price: 250,
        },
        {
            image: salame,
            name: 'Salame',
            brief: 'Пепероні - справжня італійська класика, запальна та дешева як студентка',
            price: 280,
        },
        {
            image: quattro,
            name: 'Quattro',
            brief: 'Вибір справжніх любителів сиру...',
            price: 290,
        },
        {
            image: cezar,
            name: 'Cezar',
            brief: 'Вибір справжніх любителів сиру...',
            price: 290,
        },
        {
            image: gawai,
            name: 'Gawai',
            brief: 'Вибір справжніх любителів сиру...',
            price: 290,
        },
        {
            image: mushrooms,
            name: 'Mushrooms',
            brief: 'Вибір справжніх любителів сиру...',
            price: 290,
        },
        {
            image: felicita,
            name: 'Felicita',
            brief: 'Вибір справжніх любителів сиру...',
            price: 290,
        },

    ]);

    const [showAddons, setShowAddons] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [checkmarks, setCheckmarks] = useState({}); // Стан для галочок

    // Заблокувати скрол головної сторінки при відкритій модалці
    useEffect(() => {
        if (showAddons) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Очищення стилю при розмонтуванні
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showAddons]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowAddons(false); // Закриваємо модальне вікно
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown); // Очищення обробника
        };
    }, []);

    const handleButtonClick = (index, pizza) => {
        addToCart(pizza); // Додаємо піцу до корзини
        setCheckmarks((prev) => ({ ...prev, [index]: true })); // Показуємо галочку для конкретної кнопки
        setTimeout(() => {
            setCheckmarks((prev) => ({ ...prev, [index]: false })); // Ховаємо галочку через 1 секунду
        }, 1000);
    };

    return (
        <div className="m-10 rounded-2xl gap-1 grid grid-cols-1 gap-y-24 lg:grid-cols-4 md:grid-cols-2">
            {pizza.map((arg, index) => (
                <div
                    className=" flex flex-col justify-between hover:-translate-y-1
                                transition-all hover:shadow-lg shadow-gray-500/70 rounded-2xl"
                    key={index}
                >
                    <img src={arg.image} alt={arg.name} className="" />
                    <p className="text-3xl py-1 pt-2 px-2">{arg.name} 🪿</p>
                    <div className="text-orange-800/50 px-2">{arg.brief}</div>
                    <p className="text-2xl text-orange-500 px-2 pb-6 pt-4">{arg.price} грн</p>
                    <div className="flex">
                        <button
                            type="button"
                            className={` cursor-pointer w-[50%] py-3 rounded-bl-2xl bg-orange-500 text-white text-xl hover:bg-orange-800 transition-all relative ${checkmarks[index] ? 'bg-green-500' : ''
                                }`}
                            onClick={() => handleButtonClick(index, arg)}
                        >
                            {checkmarks[index] ? (
                                <span className="absolute check-animation inset-0 flex items-center justify-center text-3xl  "><IoCheckmarkDone />
                                </span>
                            ) : (
                                'В корзину'
                            )}
                        </button>
                        <button
                            type="button"
                            className=" cursor-pointer w-[50%] py-3 rounded-br-2xl bg-orange-500 text-white text-xl hover:bg-orange-800 transition-all border-l-1"
                            onClick={() => {
                                setSelectedPizza({ ...arg });
                                setShowAddons(true);
                            }}
                        >
                            Добавки
                        </button>
                    </div>
                </div>
            ))
            }
            {
                showAddons && selectedPizza && (
                    <AddModal
                        onClose={() => setShowAddons(false)}
                        selectedPizza={selectedPizza}
                        setSelectedPizza={setSelectedPizza}
                        addToCart={addToCart} // Передаємо функцію addToCart
                    />
                )
            }

        </div >
    );
}
