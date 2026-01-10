'use client';

import { useState, useEffect } from 'react';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import Link from 'next/link';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-24 bg-black/30 relative scroll-mt-20">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title">
                        Featured <span className="text-cyan-400">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!loading && projects.map((project, index) => (
                        <motion.div
                            key={project._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-darker/50 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-darker/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-cyan-400 border border-slate-600">
                                    {project.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags && project.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">#{tag}</span>
                                    ))}
                                </div>
                                <Link
                                    href={`/projects/${project._id}`}
                                    className="inline-flex items-center text-cyan-400 font-medium hover:text-white transition-colors group/link"
                                >
                                    View Project <FaArrowRight className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}

                    {/* Coming Soon Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                            <FaPlus className="text-2xl text-gray-400 group-hover:text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">More Coming Soon</h3>
                        <p className="text-center text-gray-500 text-sm mt-2">Working on exciting new ideas</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
