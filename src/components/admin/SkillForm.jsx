// 'use client';

// import { useState, useEffect } from 'react';
// import api from '@/utils/api';
// import { useRouter } from 'next/navigation';
// import uploadImage from '../../utils/uploadImage';
// import { FaUpload } from 'react-icons/fa';

// export default function SkillForm({ skill, isEdit = false }) {
//     const [formData, setFormData] = useState({
//         name: '',
//         icon: '',
//         category: 'Frontend',
//         proficiency: 80
//     });
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const router = useRouter();

//     useEffect(() => {
//         if (skill) {
//             setFormData({
//                 name: skill.name || '',
//                 icon: skill.icon || '',
//                 category: skill.category || 'Frontend',
//                 proficiency: skill.proficiency || 80
//             });
//         }
//     }, [skill]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             setFile(e.target.files[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             let iconUrl = formData.icon;
//             if (file) {
//                 try {
//                     iconUrl = await uploadImage(file, 'skills');
//                 } catch (uploadError) {
//                     throw new Error('Image upload failed');
//                 }
//             }

//             const dataToSend = { ...formData, icon: iconUrl };

//             if (isEdit) {
//                 await api.put(`/skills/${skill._id}`, dataToSend);
//                 showSuccess('Updated!', 'Skill updated successfully');
//             } else {
//                 await api.post('/skills', dataToSend);
//                 showSuccess('Created!', 'Skill added successfully');
//             }
//             router.push('/admin/skills');
//         } catch (err) {
//             console.error(err);
//             showError('Error', err.response?.data?.message || err.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };



//     return (
//         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
//             {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Skill Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Icon/Image</label>
//                 <div className="flex items-center space-x-4 mb-2">
//                     <div className="flex-1">
//                         <label className="flex items-center justify-center px-4 py-2 bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-gray-600 transition-colors">
//                             <FaUpload className="mr-2" />
//                             <span>{file ? file.name : 'Upload Icon'}</span>
//                             <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
//                         </label>
//                     </div>
//                     <div className="flex-1">
//                         <input
//                             type="text"
//                             name="icon"
//                             value={formData.icon}
//                             onChange={handleChange}
//                             placeholder="Or paste Icon URL/Class"
//                             className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                 </div>
//                 {formData.icon && (formData.icon.startsWith('http') ? (
//                     <img src={formData.icon} alt="Preview" className="h-12 w-12 object-contain rounded bg-gray-900 border border-gray-600" />
//                 ) : (
//                     <div className="text-gray-400 text-xs">Class preview not available</div>
//                 ))}
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Category</label>
//                 <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                 >
//                     <option value="Frontend">Frontend</option>
//                     <option value="Backend">Backend</option>
//                     <option value="Tools">Tools</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Proficiency (0-100)</label>
//                 <input
//                     type="number"
//                     name="proficiency"
//                     value={formData.proficiency}
//                     onChange={handleChange}
//                     min="0"
//                     max="100"
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                 />
//             </div>

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
//             >
//                 {loading ? 'Processing...' : (isEdit ? 'Update Skill' : 'Add Skill')}
//             </button>
//         </form>
//     );
// }




'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import uploadImage from '../../utils/uploadImage';
import { FaUpload } from 'react-icons/fa';
import { showSuccess, showError } from '@/utils/swal';

export default function SkillForm({ skill, isEdit = false }) {
    const [formData, setFormData] = useState({
        name: '',
        icon: '',
        category: 'Frontend',
        proficiency: 80
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (skill) {
            setFormData({
                name: skill.name || '',
                icon: skill.icon || '',
                category: skill.category || 'Frontend',
                proficiency: skill.proficiency || 80
            });
        }
    }, [skill]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let iconUrl = formData.icon;
            if (file) {
                try {
                    // ইমেজ আপলোড করার পর লিঙ্কটা নেওয়া হচ্ছে
                    iconUrl = await uploadImage(file, 'skills');
                } catch (uploadError) {
                    throw new Error('Image upload failed');
                }
            }

            // ২. iconUrl সহ ডাটা অবজেক্ট তৈরি
            const dataToSend = { ...formData, icon: iconUrl };

            if (isEdit && skill?._id) {
                // ৩. এডিট করার সময় সঠিক আইডি দিয়ে রিকোয়েস্ট পাঠানো
                await api.put(`/skills/${skill._id}`, dataToSend);
                showSuccess('Updated!', 'Skill updated successfully');
            } else {
                // নতুন স্কিল অ্যাড করা
                await api.post('/skills', dataToSend);
                showSuccess('Created!', 'Skill added successfully');
            }

            // সাকসেস হলে লিস্ট পেজে ফিরে যাওয়া
            router.push('/admin/skills');
            router.refresh(); // UI রিফ্রেশ নিশ্চিত করতে

        } catch (err) {
            console.error("The error is:", err);
            // ৪. এরর হ্যান্ডলিং যাতে এরর হলেও আপনি মেসেজ দেখতে পান
            const message = err.response?.data?.message || err.message || 'Something went wrong';
            showError('Error', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Skill Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Icon/Image</label>
                <div className="flex items-center space-x-4 mb-2">
                    <div className="flex-1">
                        <label className="flex items-center justify-center px-4 py-2 bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-gray-600 transition-colors">
                            <FaUpload className="mr-2" />
                            <span>{file ? file.name : 'Upload Icon'}</span>
                            <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="Or paste Icon URL/Class"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                {/* প্রিভিউ লজিক */}
                {formData.icon && (formData.icon.startsWith('http') || formData.icon.startsWith('data:') ? (
                    <img src={formData.icon} alt="Preview" className="h-12 w-12 object-contain rounded bg-gray-900 border border-gray-600" />
                ) : (
                    <div className="text-gray-400 text-xs">Class preview not available</div>
                ))}
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Proficiency (0-100)</label>
                <input
                    type="number"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                {loading ? 'Processing...' : (isEdit ? 'Update Skill' : 'Add Skill')}
            </button>
        </form>
    );
}