import Blogs from '../../components/Blogs';

export const metadata = {
    title: 'Blog',
    description: 'Read the latest articles and blog posts by MD Abu Hanif Mia on web development, programming, and technology.',
    keywords: ['Blog', 'Articles', 'Web Development', 'Programming', 'Tech Blog'],
    openGraph: {
        title: 'Blog | Hanif Dev',
        description: 'Latest articles on web development, programming, and technology.',
        url: 'https://hanif.dev/blog',
    },
    alternates: {
        canonical: 'https://hanif.dev/blog',
    },
};

export default function BlogPage() {
    return <Blogs />;
}
