import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Замініть шлях на актуальний для вашого логотипу

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Логотип */}
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="Goose Pizza Logo" className=" h-10" />
                        <p className="text-lg font-bold">Goose Pizza</p>
                    </div>

                    {/* Графік роботи та номер телефону */}
                    <div className="text-center mt-4 md:mt-0">
                        <p className="text-sm">Графік роботи: 9:00 - 22:00</p>
                        <p className="text-sm">Телефон: <a href="tel:+380123456789" className="text-orange-400 hover:text-orange-500">+380 12 345 67 89</a></p>
                    </div>

                    {/* Соціальні мережі */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="/perdun" className="text-gray-400 hover:text-white transition">
                            Facebook
                        </Link>
                        <a
                            href="https://www.youtube.com/shorts/Akoc41F7P_4"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Instagram"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=2WG8VrXo9Nc&ab_channel=DrueLanglois"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Twitter"
                        >
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}