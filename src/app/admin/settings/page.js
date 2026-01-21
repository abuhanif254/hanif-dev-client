'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaDescription: '',
        aboutText: '',
        contactEmail: '',
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await axios.get('https://hanif-dev-server.vercel.app/api/config');
            // Ensure nested objects exist to avoid undefined errors
            const data = res.data;
            if (!data.socialLinks) data.socialLinks = {};

            setFormData({
                metaTitle: data.metaTitle || '',
                metaDescription: data.metaDescription || '',
                aboutText: data.aboutText || '',
                contactEmail: data.contactEmail || '',
                socialLinks: {
                    github: data.socialLinks.github || '',
                    linkedin: data.socialLinks.linkedin || '',
                    twitter: data.socialLinks.twitter || '',
                    facebook: data.socialLinks.facebook || '',
                    instagram: data.socialLinks.instagram || ''
                }
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching config:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [socialKey]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            await api.put('/config', formData);
            setMessage('Settings updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating settings:', error);
            setMessage('Failed to update settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-8">Site Settings & SEO</h2>

            {message && (
                <div className={`p-4 rounded mb-6 ${message.includes('Success') ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">SEO Configuration</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Meta Title</label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={formData.metaTitle}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Meta Description</label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white h-24"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">General Info</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">About Text (Footer/Bio)</label>
                            <textarea
                                name="aboutText"
                                value={formData.aboutText}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white h-32"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Contact Email</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">GitHub URL</label>
                            <input
                                type="text"
                                name="social_github"
                                value={formData.socialLinks.github}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">LinkedIn URL</label>
                            <input
                                type="text"
                                name="social_linkedin"
                                value={formData.socialLinks.linkedin}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Twitter URL</label>
                            <input
                                type="text"
                                name="social_twitter"
                                value={formData.socialLinks.twitter}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Instagram URL</label>
                            <input
                                type="text"
                                name="social_instagram"
                                value={formData.socialLinks.instagram}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                    {saving ? 'Saving Changes...' : 'Save All Settings'}
                </button>
            </form>
        </div>
    );
}
