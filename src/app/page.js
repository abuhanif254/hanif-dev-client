'use client';

import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Blogs from '../components/Blogs';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Blogs />
            <Contact />
        </>
    );
}
