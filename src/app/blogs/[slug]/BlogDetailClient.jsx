'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BlogDetailClient({ blog }) {
    const router = useRouter();

    if (!blog) {
        return (
            <div className="min-h-screen bg-darker flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center text-cyan-400 hover:text-white transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darker">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-slate-900 to-darker">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push('/')}
                        className="flex items-center text-cyan-400 hover:text-white transition-colors mb-8 group"
                    >
                        <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{blog.title}</h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                            <div className="flex items-center">
                                <FaUser className="mr-2 text-cyan-400" />
                                <span>{blog.author?.name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-2 text-cyan-400" />
                                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            {blog.views !== undefined && (
                                <div className="flex items-center">
                                    <span className="mr-2">👁️</span>
                                    <span>{blog.views} views</span>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-sm"
                                    >
                                        <FaTag className="mr-1 text-xs" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            {blog.image && (
                <section className="py-8">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-xl overflow-hidden shadow-2xl border border-slate-700"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Blog Content */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="prose prose-invert prose-lg max-w-none"
                    >
                        <div
                            className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </motion.article>
                </div>
            </section>

            {/* Back Button */}
            <section className="py-12 border-t border-slate-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        onClick={() => router.push('/')}
                        className="flex items-center text-cyan-400 hover:text-white transition-colors group"
                    >
                        <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </motion.button>
                </div>
            </section>
        </div>
    );
}
