import Skills from '../../components/Skills';

export const metadata = {
    title: 'Skills',
    description: 'Explore the technical skills of MD Abu Hanif Mia - proficient in React, Next.js, Node.js, Python, Flutter, and more.',
    keywords: ['Skills', 'React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'JavaScript', 'Full Stack'],
    openGraph: {
        title: 'Skills | Hanif Dev',
        description: 'Technical skills and proficiency in modern web technologies.',
        url: 'https://hanif.dev/skills',
    },
    alternates: {
        canonical: 'https://hanif.dev/skills',
    },
};

export default function SkillsPage() {
    return <Skills />;
}
