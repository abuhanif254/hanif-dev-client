'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '@/utils/api';

export default function ProjectDetail() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${params.id}`);
                setProject(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project:', error);
                setError('Project not found');
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProject();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-darker flex items-center justify-center">
                <FaSpinner className="text-4xl text-cyan-400 animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-darker flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
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
                <div className="container mx-auto px-6">
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
                        <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="text-cyan-400 font-semibold text-sm">{project.category}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">{project.description}</p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                                >
                                    <FaExternalLinkAlt className="mr-2" />
                                    Live Demo
                                </a>
                            )}
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                                >
                                    <FaGithub className="mr-2" />
                                    View Code
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Image */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl overflow-hidden shadow-2xl border border-slate-700"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
                <section className="py-12 bg-slate-900/30">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-800 border border-slate-700 text-gray-300 px-4 py-2 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    );
}
