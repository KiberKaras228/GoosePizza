import React from 'react';
import MenuCard from '../UI/MenuCard';

export default function Menu({ addToCart }) {
    return (
        <section id='menu' className='min-h-screen flex flex-col justify-center items-center max-w-full mx-auto p-12 '>
            <MenuCard addToCart={addToCart} /> {/* Передаємо addToCart */}
        </section>
    );
}
