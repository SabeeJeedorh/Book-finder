import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
function Homepage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showText, setShowText] = useState(false)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100)
        setTimeout(() => setShowText(true), 800)
        setTimeout(() => setShowButton(true), 1500)
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-out ${isLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-110'
                    }`}
                style={{ backgroundImage: "url('/wallpaper3.jpeg')" }}
            ></div>

            {/* Animated overlay gradient */}
            <div
                className={`absolute inset-0 transition-opacity duration-2000 ${isLoaded ? 'opacity-20' : 'opacity-0'
                    }`}
                style={{
                    background: 'linear-gradient(45deg, rgba(185, 28, 28, 0.1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(185, 28, 28, 0.1) 100%)'
                }}
            ></div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-pink-200 rounded-full opacity-30 animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main content with staggered animations */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">


                <div className="text-center">
         

                    <div className={`overflow-hidden transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className='text-3xl text-pink-600 font-bold font-serif sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-wide transform transition-all duration-500 hover:scale-105 hover:text-pink-700'>
                            Lost in the world of books?
                        </h2>
                    </div>

                    {/* Second line with delayed slide-up animation */}
                    <div className={`overflow-hidden transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className='text-3xl text-pink-600 font-bold font-serif sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-wide mt-4 transform transition-all duration-500 hover:scale-105 hover:text-pink-700'>
                            Let us be your compass
                        </h2>
                    </div>

                <div className={`mt-8 transition-all duration-1000 delay-700 ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                        <div className="w-24 h-1 bg-pink-600 mx-auto animate-pulse"></div>
                    </div>

                    <div className={`mt-32 transition-all duration-1000 delay-1000 ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                        <Link
                            href="/auth/login"
                            className="group relative overflow-hidden bg-gradient-to-r from-pink-600 via-pink-700 to-pink-800 hover:from-pink-700 hover:via-pink-800 hover:to-pink-900 text-white font-bold font-serif px-12 py-4 rounded-full transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 text-xl md:text-2xl lg:text-3xl shadow-lg border-2 border-pink-500 hover:border-pink-400"
                        >
                            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer transition-opacity duration-700"></div>

                            <span className="relative z-10 tracking-wider">
                                Start Reading
                            </span>

                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-25 group-active:opacity-30 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
                        </Link>


                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-25 group-active:opacity-30 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>

                    </div>

                    <div className={`mt-6 transition-all duration-1000 delay-1300 ${showButton ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-pink-100 text-sm md:text-base font-serif animate-pulse">
                            Discover your next great adventure
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom CSS for additional animations */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%) skewX(-12deg);
                    }
                    100% {
                        transform: translateX(200%) skewX(-12deg);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(185, 28, 28, 0.5);
                    }
                    50% {
                        box-shadow: 0 0 40px rgba(185, 28, 28, 0.8), 0 0 60px rgba(185, 28, 28, 0.6);
                    }
                }

                .animate-shimmer {
                    animation: shimmer 1.5s ease-in-out;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }

                /* Enhanced hover effect for text */
                h2:hover {
                    text-shadow: 0 0 20px rgba(185, 28, 28, 0.7), 0 0 40px rgba(185, 28, 28, 0.4);
                }

                /* Button hover glow effect */
                button:hover {
                    filter: brightness(1.1);
                    box-shadow: 0 10px 40px rgba(185, 28, 28, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
                }

                /* Responsive button sizing */
                @media (max-width: 640px) {
                    button {
                        padding: 12px 32px;
                        font-size: 1.125rem;
                    }
                }
            `}</style>
        </div>
    )
}

export default Homepage