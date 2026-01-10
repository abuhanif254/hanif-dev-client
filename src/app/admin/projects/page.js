'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../../utils/api';
import { showConfirm, showSuccess, showError } from '../../../utils/swal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

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

    const handleDelete = async (id) => {
        const isConfirmed = await showConfirm('Delete Project?', 'This action cannot be undone.');

        if (isConfirmed) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(project => project._id !== id));
                showSuccess('Deleted!', 'Project has been deleted.');
            } catch (error) {
                console.error('Error deleting project:', error);
                showError('Error', 'Failed to delete project');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Projects Management</h2>
                <Link href="/admin/projects/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                    <FaPlus className="mr-2" /> Add New Project
                </Link>
            </div>

            {loading ? (
                <div className="text-white text-center py-10">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-gray-400 text-center py-10 bg-gray-800 rounded-lg">
                    <p className="mb-4">No projects found.</p>
                    <p>Click "Add New Project" to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex justify-end space-x-2">
                                    <Link href={`/admin/projects/edit/${project._id}`} className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(project._id)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
