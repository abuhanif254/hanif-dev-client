import About from '../../components/About';

export const metadata = {
    title: 'About Me',
    description: 'Learn about MD Abu Hanif Mia - a full-stack web developer with over 5 years of experience in creating modern, responsive websites and web applications.',
    keywords: ['About', 'MD Abu Hanif Mia', 'Web Developer', 'Full Stack Developer', 'Bangladesh', 'MERN Stack'],
    openGraph: {
        title: 'About Me | Hanif Dev',
        description: 'Full-stack web developer with over 5 years of experience. Based in Kishoreganj, Bangladesh.',
        url: 'https://hanif.dev/about',
    },
    alternates: {
        canonical: 'https://hanif.dev/about',
    },
};

export default function AboutPage() {
    return <About />;
}
