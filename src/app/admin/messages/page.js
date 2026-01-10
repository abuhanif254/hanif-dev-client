'use client';

import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa';

export default function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/messages');
            setMessages(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await api.put(`/messages/${id}/read`);
            setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`/messages/${id}`);
                setMessages(messages.filter(msg => msg._id !== id));
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">Messages Inbox</h2>

            {loading ? (
                <div className="text-white text-center py-10">Loading messages...</div>
            ) : messages.length === 0 ? (
                <div className="text-gray-400 text-center py-10 bg-gray-800 rounded-lg">
                    <p>No messages found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className={`p-6 rounded-lg border ${msg.isRead ? 'bg-gray-800 border-gray-700' : 'bg-gray-700 border-blue-500'} shadow-md transition-colors`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{msg.subject}</h3>
                                    <p className="text-sm text-gray-400">From: <span className="text-white">{msg.name}</span> ({msg.email})</p>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex space-x-2">
                                    {!msg.isRead && (
                                        <button
                                            onClick={() => handleMarkAsRead(msg._id)}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                            title="Mark as Read"
                                        >
                                            <FaEnvelopeOpen />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                        title="Delete Message"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-4 rounded text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
