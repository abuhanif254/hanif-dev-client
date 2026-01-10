'use client';

import BlogForm from '../../../../components/admin/BlogForm';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AddBlogPage() {
    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/blogs" className="text-blue-400 hover:text-blue-300 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Blogs
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Create New Post</h2>
            <div className="max-w-4xl">
                <BlogForm />
            </div>
        </div>
    );
}
