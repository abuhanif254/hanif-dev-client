'use client';

import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import uploadImage from '../../utils/uploadImage';
import { FaUpload } from 'react-icons/fa';
import { showSuccess, showError } from '@/utils/swal';

export default function BlogForm({ blog, isEdit = false }) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        image: '',
        status: 'draft',
        tags: ''
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                slug: blog.slug || '',
                content: blog.content || '',
                image: blog.image || '',
                status: blog.status || 'draft',
                tags: blog.tags ? blog.tags.join(', ') : ''
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if slug is empty
        if (name === 'title' && !isEdit && !formData.slug) {
            setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/ /g, '-') }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;
            if (file) {
                try {
                    imageUrl = await uploadImage(file, 'blogs');
                } catch (uploadError) {
                    throw new Error('Image upload failed');
                }
            }

            const dataToSend = {
                ...formData,
                image: imageUrl,
                tags: formData.tags.split(',').map(tag => tag.trim())
            };

            if (isEdit) {
                await api.put(`/blogs/${blog._id}`, dataToSend);
                showSuccess('Updated!', 'Blog post updated successfully');
            } else {
                await api.post('/blogs', dataToSend);
                showSuccess('Created!', 'Blog post created successfully');
            }
            router.push('/admin/blogs');
        } catch (err) {
            console.error(err);
            showError('Error', err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Slug (URL friendly)</label>
                <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Content (HTML/Markdown)</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 h-64 font-mono text-sm"
                    required
                />
                <p className="text-xs text-gray-400 mt-1">You can write raw HTML or standard text here.</p>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Image URL</label>
                <div className="flex items-center space-x-4 mb-2">
                    <div className="flex-1">
                        <label className="flex items-center justify-center px-4 py-2 bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-gray-600 transition-colors">
                            <FaUpload className="mr-2" />
                            <span>{file ? file.name : 'Upload New Image'}</span>
                            <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Or paste Image URL"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                {formData.image && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-400 mb-1">Current Image Preview:</p>
                        <img src={formData.image} alt="Preview" className="h-32 object-contain rounded border border-gray-600 bg-gray-900" />
                    </div>
                )}
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm font-bold">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
            </button>
        </form>
    );
}
