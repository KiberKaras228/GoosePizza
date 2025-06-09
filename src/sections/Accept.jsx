import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Accept({ cart, setCart }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        comments: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модального вікна
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Замовлення оформлено:', formData);

        // Відкриваємо модальне вікно
        setIsModalOpen(true);

        // Очищення корзини
        setCart([]);

        // Очищення форми
        setFormData({
            name: '',
            phone: '',
            address: '',
            comments: '',
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/'); // Перенаправлення на головну сторінку
    };

    // Розрахунок загальної суми
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Оформлення замовлення</h1>
            <ul className="mb-6">
                {cart.map((item, index) => (
                    <li key={index} className="flex flex-col mb-4 p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{item.name}</span>
                                    <span>{item.quantity} x {item.price} грн</span>
                                </div>
                                {item.addons && Object.keys(item.addons).length > 0 && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p className="font-medium">Добавки:</p>
                                        <ul className="list-disc list-inside">
                                            {Object.entries(item.addons).map(([addon, count]) => (
                                                <li key={addon}>
                                                    {addon}: {count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-right font-bold text-lg mb-6">
                Загальна сума: {totalAmount} грн
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Ім'я
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Телефон
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Адреса доставки
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
                <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                        Коментарі до замовлення
                    </label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                >
                    Підтвердити замовлення
                </button>
            </form>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center flex-col">
                        <h2 className="text-xl font-bold mb-4">Дякуємо за ваше замовлення!</h2>
                        <p>Ми зв’яжемося з вами найближчим часом.</p>
                        <button
                            onClick={closeModal}
                            className="mt-4  bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                        >
                            Повернутися на головну
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}