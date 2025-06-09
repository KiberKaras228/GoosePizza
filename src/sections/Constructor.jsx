import React from 'react'
import MenuCard from '../UI/MenuCard'
import { useState } from 'react';


export default function Constructor() {
    const [show, setShow] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <button
                onClick={() => setShow(!show)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                {show ? "Сховати" : "Показати"} компонент
            </button>
            {show && <Test />}
        </div>
    );
}
// const BtnClick = () => {
//     console.log('some')

//     return (
//         <div className="absolute h-full bg-amber-200 ">i`m fucking constructor. must be</div>
//     )

// }
