'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../../utils/api';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { showConfirm, showSuccess, showError } from '../../../utils/swal';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await api.get('/blogs/admin');
            setBlogs(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = await showConfirm('Delete Blog Post?', 'This action cannot be undone.');

        if (isConfirmed) {
            try {
                await api.delete(`/blogs/${id}`);
                setBlogs(blogs.filter(blog => blog._id !== id));
                showSuccess('Deleted!', 'Blog post has been deleted.');
            } catch (error) {
                console.error('Error deleting blog:', error);
                showError('Error', 'Failed to delete blog post');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Blog Management</h2>
                <Link href="/admin/blogs/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                    <FaPlus className="mr-2" /> New Post
                </Link>
            </div>

            {loading ? (
                <div className="text-white text-center py-10">Loading blog posts...</div>
            ) : blogs.length === 0 ? (
                <div className="text-gray-400 text-center py-10 bg-gray-800 rounded-lg">
                    <p className="mb-4">No blog posts found.</p>
                    <p>Click "New Post" to create your first article.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col">
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${blog.status === 'published' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-black'}`}>
                                        {blog.status.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center">
                                        <FaEye className="mr-1" /> {blog.views || 0}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{blog.title}</h3>
                                <p className="text-gray-400 text-xs mb-4">By {blog.author?.name} on {new Date(blog.createdAt).toLocaleDateString()}</p>

                                <div className="mt-auto flex justify-end space-x-2 pt-4 border-t border-gray-700">
                                    <Link href={`/admin/blogs/edit/${blog._id}`} className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
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
