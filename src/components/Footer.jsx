'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaHeart, FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Skills', href: '#skills' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' }
        ],
        services: [
            { name: 'Web Development', href: '#' },
            { name: 'UI/UX Design', href: '#' },
            { name: 'App Development', href: '#' },
            { name: 'Consultation', href: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' }
        ]
    };

    return (
        <footer className="bg-darker pt-20 pb-10 relative overflow-hidden border-t border-slate-800">
            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-3xl font-bold text-cyan-400 mb-6 flex items-center">
                            <span className="text-white mr-2">&lt;</span>Hanif<span className="text-secondary">Dev</span><span className="text-white ml-2">/&gt;</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Building digital experiences that matter. Focused on performance, accessibility, and modern aesthetics.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: <FaGithub />, href: 'https://github.com/abuhanif254' },
                                { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/md-abu-hanif-mia' },
                                { icon: <FaTwitter />, href: 'https://x.com/MohammadBitull1' },
                                { icon: <FaFacebook />, href: 'https://www.facebook.com/bitulla' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all duration-300 hover:-translate-y-1 shadow-lg"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-cyan-500/30 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group">
                                        <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-secondary/30 pb-2 inline-block">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-secondary transition-colors flex items-center group">
                                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-secondary transition-colors"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-accent/30 pb-2 inline-block">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start text-gray-400">
                                <FaMapMarkerAlt className="mt-1.5 mr-3 text-cyan-400" />
                                <span>2300 Kishoreganj Sadar,<br />Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                                <FaEnvelope className="mr-3 text-cyan-400" />
                                <a href="mailto:mohammadbitullah@gmail.com">mohammadbitullah@gmail.com</a>
                            </li>
                            <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                                <FaPhone className="mr-3 text-cyan-400" />
                                <a href="tel:+8801771528927">+880 1538365657</a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-gray-500 text-sm mb-4 md:mb-0 text-center md:text-left">
                        &copy; {currentYear} <span className="text-white font-medium">Hanif Dev</span>. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                        {footerLinks.legal.map(link => (
                            <a key={link.name} href={link.href} className="hover:text-cyan-400 transition-colors">{link.name}</a>
                        ))}
                        <p className="flex items-center">
                            Made with <FaHeart className="mx-1 text-red-500 animate-pulse" /> in React
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
