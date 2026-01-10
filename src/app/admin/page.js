'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FaProjectDiagram, FaTools, FaEnvelope, FaNewspaper, FaUsers, FaEye, FaPlus } from 'react-icons/fa';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        messages: 0,
        blogs: 0,
        users: 0,
        views: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Projects', value: stats.projects, icon: <FaProjectDiagram />, color: 'bg-blue-500' },
        { title: 'Total Skills', value: stats.skills, icon: <FaTools />, color: 'bg-green-500' },
        { title: 'Unread Messages', value: stats.messages, icon: <FaEnvelope />, color: 'bg-yellow-500' },
        { title: 'Blog Posts', value: stats.blogs, icon: <FaNewspaper />, color: 'bg-purple-500' },
        { title: 'Total Users', value: stats.users, icon: <FaUsers />, color: 'bg-indigo-500' },
        { title: 'Total Views', value: stats.views, icon: <FaEye />, color: 'bg-red-500' },
    ];

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className={`${card.color} rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-200`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-80 mb-1">{card.title}</p>
                                <h3 className="text-3xl font-bold">{card.value}</h3>
                            </div>
                            <div className="text-4xl opacity-50">
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/admin/projects/add" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 p-6 rounded-xl shadow-lg flex items-center justify-between group transition-all duration-300 transform hover:-translate-y-1">
                        <div>
                            <h4 className="font-bold text-lg text-white">Add Project</h4>
                            <p className="text-blue-100 text-sm">Portfolio item</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full text-white group-hover:scale-110 transition-transform">
                            <FaPlus />
                        </div>
                    </Link>

                    <Link href="/admin/skills/add" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 p-6 rounded-xl shadow-lg flex items-center justify-between group transition-all duration-300 transform hover:-translate-y-1">
                        <div>
                            <h4 className="font-bold text-lg text-white">Add Skill</h4>
                            <p className="text-green-100 text-sm">Technical skill</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full text-white group-hover:scale-110 transition-transform">
                            <FaPlus />
                        </div>
                    </Link>

                    <Link href="/admin/blogs/add" className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 p-6 rounded-xl shadow-lg flex items-center justify-between group transition-all duration-300 transform hover:-translate-y-1">
                        <div>
                            <h4 className="font-bold text-lg text-white">Post Article</h4>
                            <p className="text-purple-100 text-sm">New blog post</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full text-white group-hover:scale-110 transition-transform">
                            <FaNewspaper />
                        </div>
                    </Link>

                    <Link href="/admin/users" className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 p-6 rounded-xl shadow-lg flex items-center justify-between group transition-all duration-300 transform hover:-translate-y-1">
                        <div>
                            <h4 className="font-bold text-lg text-white">Manage Users</h4>
                            <p className="text-indigo-100 text-sm">View user list</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full text-white group-hover:scale-110 transition-transform">
                            <FaUsers />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-12 bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <p className="text-gray-400">Recent activity logs will appear here.</p>
            </div>
        </div>
    );
}
