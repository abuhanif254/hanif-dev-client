import Contact from '../../components/Contact';

export const metadata = {
    title: 'Contact',
    description: 'Get in touch with MD Abu Hanif Mia for project inquiries, collaboration opportunities, or just to say hello.',
    keywords: ['Contact', 'Hire Developer', 'Web Development Services', 'Freelance Developer'],
    openGraph: {
        title: 'Contact | Hanif Dev',
        description: 'Reach out for project inquiries, collaboration, or opportunities.',
        url: 'https://hanif.dev/contact',
    },
    alternates: {
        canonical: 'https://hanif.dev/contact',
    },
};

export default function ContactPage() {
    return <Contact />;
}
