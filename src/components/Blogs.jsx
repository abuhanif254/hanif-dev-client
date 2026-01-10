'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import Link from 'next/link';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch all blogs
                const res = await api.get('/blogs');
                // Sort by date descending and take top 3
                const sortedBlogs = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
                setBlogs(sortedBlogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (!loading && blogs.length === 0) return null;

    return (
        <section id="blog" className="py-20 relative bg-slate-900/50 scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title">
                        Latest <span className="text-cyan-400">Articles</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!loading && blogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-cyan-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                    {blog.category || 'Tech'}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
                                    <span className="flex items-center"><FaUser className="mr-1 text-cyan-400" /> {blog.author?.name || 'Admin'}</span>
                                    <span className="flex items-center"><FaCalendarAlt className="mr-1 text-cyan-400" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                    {blog.content.substring(0, 100)}...
                                </p>
                                <Link href={`/blogs/${blog.slug}`} className="inline-flex items-center text-cyan-400 text-sm font-semibold hover:text-white transition-colors group/link">
                                    Read More <FaArrowRight className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
