'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '@/utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/messages', formData);
            alert('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
            setLoading(false);
        }
    };
    return (
        <section id="contact" className="py-24 relative scroll-mt-20">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title">
                        Get In <span className="text-cyan-400">Touch</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-cyan-400">Contact Information</h3>
                        <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                            Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start bg-slate-800/50 p-5 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                                <div className="text-cyan-400 mr-5 text-2xl mt-1">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Email Me</h4>
                                    <p className="text-gray-400">mohammadbitullah@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start bg-slate-800/50 p-5 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                                <div className="text-cyan-400 mr-5 text-2xl mt-1">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Call Me</h4>
                                    <p className="text-gray-400">+88015383655657</p>
                                </div>
                            </div>
                            <div className="flex items-start bg-slate-800/50 p-5 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                                <div className="text-cyan-400 mr-5 text-2xl mt-1">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Location</h4>
                                    <p className="text-gray-400">2300 Kishoreganj Sadar, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h4 className="font-semibold text-lg mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                {[<FaGithub />, <FaLinkedinIn />, <FaTwitter />, <FaFacebookF />].map((icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all duration-300 hover:-translate-y-1 shadow-md">
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/30 p-8 rounded-xl backdrop-blur-sm border border-slate-700/30 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 text-white"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 text-white"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 text-white"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>
                            <div className="relative z-10">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 text-white resize-none"
                                    placeholder="Let's talk about..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex justify-center items-center relative z-10 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <FaPaperPlane className="mr-2" /> {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
