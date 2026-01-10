import BlogDetailClient from './BlogDetailClient';
import { use } from 'react';

// Helper to fetch blog data
async function getBlog(slug) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/${slug}`, {
            cache: 'no-store' // Ensure fresh data
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

// Generate Metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found | Hanif Dev',
        };
    }

    return {
        title: `${blog.title} | Hanif Dev`,
        description: blog.content?.substring(0, 160).replace(/<[^>]*>?/gm, ''), // Strip HTML tags
        openGraph: {
            title: blog.title,
            description: blog.content?.substring(0, 160).replace(/<[^>]*>?/gm, ''),
            images: [blog.image || '/og-image.jpg'],
            type: 'article',
            publishedTime: blog.createdAt,
            authors: [blog.author?.name || 'Admin'],
            tags: blog.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.content?.substring(0, 160).replace(/<[^>]*>?/gm, ''),
            images: [blog.image || '/og-image.jpg'],
        },
    };
}

export default function BlogPage({ params }) {
    const { slug } = use(params);

    return <BlogWrapper slug={slug} />;
}

async function BlogWrapper({ slug }) {
    const blog = await getBlog(slug);
    return <BlogDetailClient blog={blog} />;
}
