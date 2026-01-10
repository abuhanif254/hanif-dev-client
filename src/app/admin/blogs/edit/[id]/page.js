'use client';

import { useState, useEffect, use } from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/utils/api';

const EditBlog = ({ params }) => {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // We need to fetch from admin endpoint to get even drafts if we want, or filtered
                const res = await api.get(`/blogs/admin`, {
                    params: { id }
                });
                const found = res.data.find(b => b._id === id);
                setBlog(found);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!blog) return <div>Blog post not found</div>;

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/blogs" className="text-blue-400 hover:text-blue-300 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Blogs
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Edit Post</h2>
            <div className="max-w-4xl">
                <BlogForm blog={blog} isEdit={true} />
            </div>
        </div>
    );
}

export default EditBlog;
