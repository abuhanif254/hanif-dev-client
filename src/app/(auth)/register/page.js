'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaGoogle, FaFacebookF, FaEnvelope, FaLock } from 'react-icons/fa';
import { showSuccess, showError } from '../../../utils/swal';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, socialLogin } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return showError('Error', 'Passwords do not match');
        }

        setLoading(true);

        const result = await register(name, email, password);

        if (result.success) {
            showSuccess('Account Created', 'Registered successfully');
            router.push('/');
        } else {
            showError('Registration Failed', result.message);
        }
        setLoading(false);
    };

    const handleSocialLogin = async (provider) => {
        const mockData = {
            email: `user_${Math.random().toString(36).substring(7)}@example.com`,
            name: `${provider} User`,
            provider
        };

        await socialLogin(mockData);
        showSuccess('Welcome!', `Logged in with ${provider} successfully`);
        router.push('/');
    };

    return (
        <section className="min-h-screen py-24 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-darker/80 backdrop-blur-sm"></div>

            <div className="container mx-auto px-6 relative z-10 flex justify-center">
                <div className="w-full max-w-md bg-slate-900/80 p-8 rounded-2xl border border-slate-700/50 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-medium">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-medium">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col gap-4">
                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-gray-700"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">Or continue with</span>
                            <div className="flex-grow border-t border-gray-700"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center py-2.5 border border-gray-700 rounded-lg hover:bg-slate-800 transition-colors text-white"
                            >
                                <FaGoogle className="mr-2 text-red-500" /> Google
                            </button>
                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex items-center justify-center py-2.5 border border-gray-700 rounded-lg hover:bg-slate-800 transition-colors text-white"
                            >
                                <FaFacebookF className="mr-2 text-blue-500" /> Facebook
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
