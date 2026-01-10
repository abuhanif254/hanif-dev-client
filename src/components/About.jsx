'use client';

import { FaUserTie, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 bg-black/30 backdrop-blur-sm relative scroll-mt-20">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title">
                        About <span className="text-cyan-400">Me</span>
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/3 mb-12 md:mb-0 flex justify-center relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-30 blur-xl group-hover:opacity-50 transition duration-500"></div>
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl border border-slate-700 shadow-2xl overflow-hidden relative z-10">
                                <img
                                    src="/profile.png.jpg"
                                    alt="MD Abu Hanif Mia"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-400">Professional Web Developer</h3>
                            <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                                I'm a full-stack web developer with over 5 years of experience in creating modern, responsive websites and web applications. My expertise spans across front-end and back-end technologies, allowing me to build complete solutions from concept to deployment.
                            </p>
                            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                                Based in Kishoreganj, Bangladesh, I've worked with clients worldwide to deliver high-quality digital products. My approach combines technical excellence with attention to design and user experience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start">
                                    <div className="text-cyan-400 mr-4 mt-1 text-xl"><FaUserTie /></div>
                                    <div>
                                        <p className="text-gray-400 font-medium">Name:</p>
                                        <p className="text-white">MD Abu Hanif Mia</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-cyan-400 mr-4 mt-1 text-xl"><FaEnvelope /></div>
                                    <div>
                                        <p className="text-gray-400 font-medium">Email:</p>
                                        <p className="text-white">mohammadbitullah@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-cyan-400 mr-4 mt-1 text-xl"><FaPhoneAlt /></div>
                                    <div>
                                        <p className="text-gray-400 font-medium">Phone:</p>
                                        <p className="text-white">+8801538365657</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-cyan-400 mr-4 mt-1 text-xl"><FaMapMarkerAlt /></div>
                                    <div>
                                        <p className="text-gray-400 font-medium">Address:</p>
                                        <p className="text-white">2300 Kishoreganj Sadar, Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300">
                                <FaDownload className="mr-2" /> Download CV
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
