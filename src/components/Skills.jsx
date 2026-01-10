'use client';

import { useState, useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaPython, FaDatabase, FaFigma, FaGitAlt, FaWordpress } from 'react-icons/fa';
import { RiFlutterFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import axios from 'axios';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/skills');
                setSkills(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching skills:', error);
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 relative scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title">
                        My <span className="text-cyan-400">Skills</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {!loading && skills.map((skill, index) => (
                        <motion.div
                            key={skill._id || index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, borderColor: skill.color || '#61DAFB' }}
                            className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm transition-all duration-300 group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="text-4xl mr-4 transition-transform duration-300 group-hover:rotate-12" style={{ color: skill.color || '#61DAFB' }}>
                                    {/* Icon handling: Check if it's a URL (image) or if we need a fallback */}
                                    {skill.icon && skill.icon.startsWith('http') ? (
                                        <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
                                    ) : (
                                        // Fallback for non-image icons - simpler to just show name or generic icon if mapping isn't perfect
                                        // For now, let's use a generic code icon if not an image
                                        <FaReact />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                    className="h-2.5 rounded-full relative overflow-hidden"
                                    style={{ backgroundColor: skill.color || '#61DAFB' }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.proficiency || skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                                </motion.div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <span className="text-sm text-gray-400">{skill.proficiency || skill.level}%</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
