// 'use client';

// import { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
// import uploadImage from '../../utils/uploadImage';
// import { FaUpload, FaImage } from 'react-icons/fa';

// export default function ProjectForm({ project, isEdit = false }) {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         image: '',
//         liveLink: '',
//         githubLink: '',
//         technologies: '',
//         category: 'Web Development'
//     });
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const router = useRouter();
//     const { token } = useAuth();

//     useEffect(() => {
//         if (project) {
//             setFormData({
//                 title: project.title || '',
//                 description: project.description || '',
//                 image: project.image || '',
//                 liveLink: project.liveLink || '',
//                 githubLink: project.githubLink || '',
//                 technologies: project.technologies ? project.technologies.join(', ') : '',
//                 category: project.category || 'Web Development'
//             });
//         }
//     }, [project]);

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
//             let imageUrl = formData.image;
//             if (file) {
//                 try {
//                     imageUrl = await uploadImage(file, 'projects');
//                 } catch (uploadError) {
//                     throw new Error('Image upload failed');
//                 }
//             }

//             const dataToSubmit = {
//                 ...formData,
//                 image: imageUrl,
//                 technologies: formData.technologies.split(',').map(tech => tech.trim())
//             };

//             if (isEdit) {
//                 await api.put(`/projects/${project._id}`, dataToSubmit);
//                 showSuccess('Updated!', 'Project updated successfully');
//             } else {
//                 await api.post('/projects', dataToSubmit);
//                 showSuccess('Created!', 'Project created successfully');
//             }
//             router.push('/admin/projects');
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
//                 <label className="block mb-2 text-sm font-bold">Project Title</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Description</label>
//                 <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 h-32"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Project Image</label>
//                 <div className="flex items-center space-x-4">
//                     <div className="flex-1">
//                         <label className="flex items-center justify-center px-4 py-2 bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-gray-600 transition-colors">
//                             <FaUpload className="mr-2" />
//                             <span>{file ? file.name : 'Upload New Image'}</span>
//                             <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
//                         </label>
//                     </div>
//                     {/* Fallback to URL input */}
//                     <div className="flex-1">
//                         <input
//                             type="text"
//                             name="image"
//                             value={formData.image}
//                             onChange={handleChange}
//                             placeholder="Or paste Image URL"
//                             className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                 </div>
//                 {formData.image && (
//                     <div className="mt-2">
//                         <p className="text-xs text-gray-400 mb-1">Current Image Preview:</p>
//                         <img src={formData.image} alt="Preview" className="h-32 object-contain rounded border border-gray-600 bg-gray-900" />
//                     </div>
//                 )}
//             </div>

//             <div className="mb-4 grid grid-cols-2 gap-4">
//                 <div>
//                     <label className="block mb-2 text-sm font-bold">Live Link</label>
//                     <input
//                         type="text"
//                         name="liveLink"
//                         value={formData.liveLink}
//                         onChange={handleChange}
//                         className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-sm font-bold">GitHub Link</label>
//                     <input
//                         type="text"
//                         name="githubLink"
//                         value={formData.githubLink}
//                         onChange={handleChange}
//                         className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                     />
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Technologies (comma separated)</label>
//                 <input
//                     type="text"
//                     name="technologies"
//                     value={formData.technologies}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                     placeholder="React, Node.js, MongoDB"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-2 text-sm font-bold">Category</label>
//                 <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//                 >
//                     <option value="Web Development">Web Development</option>
//                     <option value="Mobile App">Mobile App</option>
//                     <option value="Design">Design</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </div>

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center"
//             >
//                 {loading ? 'Processing...' : (isEdit ? 'Update Project' : 'Create Project')}
//             </button>
//         </form>
//     );
// }






'use client';

import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import uploadImage from '../../utils/uploadImage';
import { FaUpload } from 'react-icons/fa';
import { showSuccess, showError } from '@/utils/swal';

export default function ProjectForm({ project, isEdit = false }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        liveLink: '',
        githubLink: '',
        technologies: '',
        category: 'Web Development'
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                image: project.image || '',
                liveLink: project.liveLink || '',
                githubLink: project.githubLink || '',
                technologies: project.technologies ? project.technologies.join(', ') : '',
                category: project.category || 'Web Development'
            });
        }
    }, [project]);

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
            let imageUrl = formData.image;
            if (file) {
                try {
                    imageUrl = await uploadImage(file, 'projects');
                } catch (uploadError) {
                    throw new Error('Image upload failed');
                }
            }

            const dataToSubmit = {
                ...formData,
                image: imageUrl,
                // টেকনোলজিগুলোকে অ্যারেতে কনভার্ট করা হচ্ছে
                technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()) : []
            };

            if (isEdit) {
                // ২. এডিট করার সময় আইডি চেক করা হচ্ছে
                await api.put(`/projects/${project._id}`, dataToSubmit);
                showSuccess('Updated!', 'Project updated successfully');
            } else {
                await api.post('/projects', dataToSubmit);
                showSuccess('Created!', 'Project created successfully');
            }

            router.push('/admin/projects');
            router.refresh(); // ডেটা আপডেট নিশ্চিত করতে
        } catch (err) {
            console.error("API Error:", err);
            // ৩. এরর মেসেজটি সুন্দরভাবে দেখানো
            const errorMsg = err.response?.data?.message || err.message || 'Something went wrong';
            showError('Error', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Project Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 h-32"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Project Image</label>
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <label className="flex items-center justify-center px-4 py-2 bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-gray-600 transition-colors">
                            <FaUpload className="mr-2" />
                            <span>{file ? file.name : 'Upload New Image'}</span>
                            <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Or paste Image URL"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                {formData.image && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-400 mb-1">Current Image Preview:</p>
                        <img src={formData.image} alt="Preview" className="h-32 object-contain rounded border border-gray-600 bg-gray-900" />
                    </div>
                )}
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm font-bold">Live Link</label>
                    <input
                        type="text"
                        name="liveLink"
                        value={formData.liveLink}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold">GitHub Link</label>
                    <input
                        type="text"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Technologies (comma separated)</label>
                <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                    placeholder="React, Node.js, MongoDB"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Design">Design</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center"
            >
                {loading ? 'Processing...' : (isEdit ? 'Update Project' : 'Create Project')}
            </button>
        </form>
    );
}