'use client';

import { useState, useEffect, use } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/utils/api';

const EditProject = ({ params }) => {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/projects" className="text-blue-400 hover:text-blue-300 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Projects
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Edit Project</h2>
            <div className="max-w-2xl">
                <ProjectForm project={project} isEdit={true} />
            </div>
        </div>
    );
}

export default EditProject;
