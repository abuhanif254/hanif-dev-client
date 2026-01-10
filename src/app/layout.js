import '../index.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThreeBackground from '../components/ThreeBackground';

export const metadata = {
    metadataBase: new URL('https://hanif.dev'),
    title: {
        default: 'Hanif Dev - Full Stack Developer & UI/UX Designer',
        template: '%s | Hanif Dev'
    },
    description: 'Portfolio of MD Abu Hanif Mia. Expert in MERN Stack, Next.js, and modern web design. Building exceptional digital experiences.',
    keywords: ['Web Developer', 'React', 'Next.js', 'Portfolio', 'Bangladesh', 'Full Stack', 'MERN Stack', 'JavaScript', 'TypeScript'],
    authors: [{ name: 'MD Abu Hanif Mia', url: 'https://hanif.dev' }],
    creator: 'MD Abu Hanif Mia',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Hanif Dev - Full Stack Developer',
        description: 'Building exceptional digital experiences that are fast, accessible, and visually appealing.',
        url: 'https://hanif.dev',
        siteName: 'Hanif Dev',
        images: [
            {
                url: '/og-image.jpg', // Assuming you might have one, or keep the placeholder
                width: 1200,
                height: 630,
                alt: 'Hanif Dev Portfolio',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hanif Dev - Full Stack Developer',
        description: 'Building exceptional digital experiences that are fast, accessible, and visually appealing.',
        images: ['/og-image.jpg'],
        creator: '@hanif_dev',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },
    alternates: {
        canonical: 'https://hanif.dev',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className="bg-darker text-slate-200 overflow-x-hidden font-sans">
                <AuthProvider>
                    <ThreeBackground />
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
