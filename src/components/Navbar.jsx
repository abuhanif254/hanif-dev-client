'use client';

import { useState } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Blog', href: '/#blog' },
        { name: 'Contact', href: '/#contact' },
    ];

    // Helper to close mobile menu when clicking a link
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav className="container mx-auto px-6 py-6 fixed w-full z-50 bg-darker/80 backdrop-blur-md top-0">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-3xl font-bold text-cyan-400 flex items-center">
                        <span className="text-white mr-2">&lt;</span>Hanif<span className="text-secondary">Dev</span><span className="text-white ml-2">/&gt;</span>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        {/* Search Icon */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gray-300 hover:text-cyan-400 transition-colors text-xl p-2 rounded-full hover:bg-white/5"
                            aria-label="Search"
                        >
                            <FaSearch />
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white hover:text-cyan-400 transition nav-link text-sm uppercase tracking-wider font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex items-center space-x-4">
                                {user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="text-white hover:text-cyan-400 font-medium transition-colors border border-cyan-500/50 px-4 py-2 rounded-lg hover:bg-cyan-500/10"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg font-medium transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    href="/login"
                                    className="text-white hover:text-cyan-400 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-cyan-500/30"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white text-xl"
                        >
                            <FaSearch />
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none text-white text-2xl"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden mt-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col space-y-4 px-2 py-4 bg-dark/95 backdrop-blur-xl rounded-lg border border-slate-800">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={handleLinkClick}
                                className="text-white hover:text-cyan-400 transition block px-4 py-2 hover:bg-white/5 rounded-lg"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t border-slate-700 pt-4 mt-2">
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-red-400 hover:text-red-300 transition block px-4 py-2 hover:bg-red-500/10 rounded-lg"
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="flex flex-col space-y-3 px-2">
                                    <Link
                                        href="/login"
                                        onClick={handleLinkClick}
                                        className="text-center text-white hover:text-cyan-400 transition block py-2 border border-slate-600 rounded-lg"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={handleLinkClick}
                                        className="text-center bg-cyan-500 text-white hover:bg-cyan-600 transition block py-2 rounded-lg"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;
