'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaExternalLinkAlt, FaHashtag, FaCode, FaBolt, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { searchIndex } from '../data/searchIndex';

const SearchBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setResults([]);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = searchIndex.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        ).slice(0, 8); // Limit to 8 results

        setResults(filtered);
        setSelectedIndex(0);
    }, [query]);

    const handleNavigate = (item) => {
        if (item.external) {
            window.open(item.path, '_blank');
        } else {
            if (item.path.startsWith('/#')) {
                const id = item.path.substring(2);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    router.push('/');
                    setTimeout(() => {
                        const el = document.getElementById(id);
                        el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            } else {
                router.push(item.path);
            }
        }
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter' && results.length > 0) {
            handleNavigate(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Section': return <FaHashtag className="text-gray-400" />;
            case 'Skill': return <FaCode className="text-cyan-400" />;
            case 'Project': return <FaExternalLinkAlt className="text-secondary" />;
            case 'Action': return <FaBolt className="text-yellow-400" />;
            default: return <FaSearch className="text-gray-400" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] bg-darker/80 backdrop-blur-md flex items-start justify-center pt-24 px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: -50, scale: 0.95 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: -50, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="relative border-b border-slate-700">
                            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search sections, skills, projects..."
                                className="w-full bg-transparent text-white text-lg py-5 pl-14 pr-12 focus:outline-none placeholder-gray-500"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    <FaTimes />
                                </button>
                            )}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <span className="text-xs text-gray-500 border border-gray-700 px-2 py-1 rounded">ESC</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {results.length > 0 ? (
                                <div className="py-2">
                                    {results.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigate(item)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`w-full text-left px-5 py-3 flex items-center justify-between transition-colors ${index === selectedIndex ? 'bg-cyan-500/10 border-l-4 border-cyan-500' : 'border-l-4 border-transparent hover:bg-slate-800'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
                                                    {getIcon(item.type)}
                                                </span>
                                                <div>
                                                    <div className={`font-medium ${index === selectedIndex ? 'text-cyan-400' : 'text-gray-200'}`}>
                                                        {item.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                                        <span className="bg-slate-800 px-1.5 py-0.5 rounded">{item.type}</span>
                                                        {item.tags.slice(0, 3).join(', ')}
                                                    </div>
                                                </div>
                                            </div>
                                            {index === selectedIndex && (
                                                <FaArrowRight className="text-cyan-500 text-sm" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ) : query ? (
                                <div className="py-12 text-center text-gray-500">
                                    <p>No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="py-12 text-center text-gray-500">
                                    <p>Type to start searching...</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 text-xs text-gray-500 flex justify-between">
                            <div className="flex gap-4">
                                <span><span className="font-bold text-gray-400">↑↓</span> to navigate</span>
                                <span><span className="font-bold text-gray-400">↵</span> to select</span>
                            </div>
                            <span>Advanced Search</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchBar;
