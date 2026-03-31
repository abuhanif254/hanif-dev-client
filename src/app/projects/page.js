import Projects from '../../components/Projects';

export const metadata = {
    title: 'Projects',
    description: 'View the portfolio of projects by MD Abu Hanif Mia - featuring web applications, websites, and digital products built with modern technologies.',
    keywords: ['Projects', 'Portfolio', 'Web Development', 'React Projects', 'Next.js Projects'],
    openGraph: {
        title: 'Projects | Hanif Dev',
        description: 'Featured projects and portfolio showcasing modern web development work.',
        url: 'https://hanif.dev/projects',
    },
    alternates: {
        canonical: 'https://hanif.dev/projects',
    },
};

export default function ProjectsPage() {
    return <Projects />;
}
