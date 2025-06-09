import React, { use } from 'react'
import gooseLogo from '../assets/gooseLogo.webp'

export default function Home() {

    return (
        <section id='home' className='min-h-screen flex flex-col justify-center items-center
            lg:flex-row-reverse gap-9 lg:gap-18 max-w-5xl mx-auto'>
            <div className="text-center z-10 px-4">
                <img src={gooseLogo} alt="gooseLogo" className='w-[350px] border-0 mt-20 rounded-full shadow-lg shadow-gray-500/70
                lg:m-0 lg:max-w-[350px] object-cover object-bottom hover:translate-y-1 transition-all '/>
            </div>
            <div className="text-center font-mono px-4">
                <h1 className='text-orange-400 text-5xl'>НАЙКРАЩА ПІЦА, ОСОБИСТО ВІД ГУСЯ !</h1>
            </div>
        </section>
    )
}


