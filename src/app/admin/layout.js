'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaHome,
    FaProjectDiagram,
    FaTools,
    FaEnvelope,
    FaNewspaper,
    FaUsers,
    FaCogs,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push('/login');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    const menuItems = [
        { name: 'Overview', icon: <FaHome />, path: '/admin' },
        { name: 'Projects', icon: <FaProjectDiagram />, path: '/admin/projects' },
        { name: 'Skills', icon: <FaTools />, path: '/admin/skills' },
        { name: 'Messages', icon: <FaEnvelope />, path: '/admin/messages' },
        { name: 'Blog Posts', icon: <FaNewspaper />, path: '/admin/blogs' },
        { name: 'Users', icon: <FaUsers />, path: '/admin/users' },
        { name: 'Settings', icon: <FaCogs />, path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-blue-400">Admin Panel</h1>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <FaTimes />
                    </button>
                </div>
                <nav className="mt-4 px-2 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname === item.path
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
                <header className="flex items-center justify-between p-4 bg-gray-800 md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
                        <FaBars size={24} />
                    </button>
                    <span className="font-semibold">Dashboard</span>
                    <div className="w-6"></div> {/* Spacer for centering */}
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
