'use client';

import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaUserShield, FaBan, FaCheckCircle } from 'react-icons/fa';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleToggleBlock = async (id) => {
        try {
            const res = await api.put(`/users/${id}/block`);
            setUsers(users.map(user => user._id === id ? { ...user, isBlocked: res.data.isBlocked } : user));
        } catch (error) {
            console.error('Error blocking/unblocking user:', error);
            alert(error.response?.data?.message || 'Failed to update user status');
        }
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">User Management</h2>

            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBlocked ? (
                                        <span className="text-red-500 flex items-center"><FaBan className="mr-1" /> Blocked</span>
                                    ) : (
                                        <span className="text-green-500 flex items-center"><FaCheckCircle className="mr-1" /> Active</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleToggleBlock(user._id)}
                                            className={`p-2 rounded transition-colors ${user.isBlocked ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                                            title={user.isBlocked ? "Unblock User" : "Block User"}
                                        >
                                            {user.isBlocked ? <FaCheckCircle /> : <FaBan />}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
