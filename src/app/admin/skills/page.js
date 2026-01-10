'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../../utils/api';
import { showConfirm, showSuccess, showError } from '../../../utils/swal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await api.get('/skills');
            setSkills(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching skills:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = await showConfirm('Delete Skill?', 'This action cannot be undone.');

        if (isConfirmed) {
            try {
                await api.delete(`/skills/${id}`);
                setSkills(skills.filter(skill => skill._id !== id));
                showSuccess('Deleted!', 'Skill has been deleted.');
            } catch (error) {
                console.error('Error deleting skill:', error);
                showError('Error', 'Failed to delete skill');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Skills Management</h2>
                <Link href="/admin/skills/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                    <FaPlus className="mr-2" /> Add New Skill
                </Link>
            </div>

            {loading ? (
                <div className="text-white text-center py-10">Loading skills...</div>
            ) : skills.length === 0 ? (
                <div className="text-gray-400 text-center py-10 bg-gray-800 rounded-lg">
                    <p className="mb-4">No skills found.</p>
                    <p>Click "Add New Skill" to get started.</p>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Proficiency</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {skills.map((skill) => (
                                <tr key={skill._id} className="hover:bg-gray-700">
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div className="flex items-center">
                                            {skill.icon && skill.icon.startsWith('http') ? (
                                                <img src={skill.icon} alt={skill.name} className="w-8 h-8 mr-3 rounded object-contain bg-gray-700 p-1 flex-shrink-0" />
                                            ) : (
                                                <span className="mr-3 p-1 bg-gray-700 rounded w-8 h-8 flex items-center justify-center flex-shrink-0 overflow-hidden text-[8px] break-all">{skill.icon}</span>
                                            )}
                                            <span className="truncate max-w-[150px]">{skill.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{skill.category}</td>
                                    <td className="px-6 py-4">
                                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
                                        </div>
                                        <span className="text-xs mt-1 block">{skill.proficiency}%</span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={`/admin/skills/edit/${skill._id}`} className="inline-block p-2 text-yellow-400 hover:text-white transition-colors">
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => handleDelete(skill._id)} className="p-2 text-red-400 hover:text-white transition-colors">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
