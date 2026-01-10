'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

const Hero = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Build Websites', 'Develop Web Apps', 'Create UI/UX Designs', 'Solve Problems', 'Write Clean Code'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section id="home" className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center pt-32 min-h-screen scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 mb-16 md:mb-0"
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <span className="text-white">Hi, I'm </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">MD Abu Hanif Mia</span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
                    <span className="text-white">I </span>
                    <span ref={el} className="text-cyan-400 font-medium"></span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                    A passionate full-stack developer specializing in modern web technologies. I build exceptional digital experiences that are fast, accessible, and visually appealing.
                </p>
                <div className="flex space-x-4">
                    <a href="#contact" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all duration-300">
                        Hire Me
                    </a>
                    <a href="#projects" className="border border-slate-600 bg-slate-900/50 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
                        View Work
                    </a>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:w-1/2 flex justify-center relative"
            >
                <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-primary via-secondary to-accent animate-spin-slow">
                        <div className="w-full h-full rounded-full bg-darker overflow-hidden border-4 border-darker">
                            <img
                                src="/profile.png.jpg"
                                alt="MD Abu Hanif Mia"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    {/* Floating Cards - Hidden on mobile to prevent overlap */}
                    <div className="hidden md:block absolute -bottom-5 -right-5 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl animate-float">
                        <div className="text-2xl font-bold text-white">5+</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                    </div>
                    <div className="hidden md:block absolute top-10 -left-10 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                        <div className="text-2xl font-bold text-white">50+</div>
                        <div className="text-sm text-gray-400">Projects Done</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
