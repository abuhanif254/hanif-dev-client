'use client';

import ProjectForm from '../../../../components/admin/ProjectForm';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AddProjectPage() {
    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/projects" className="text-blue-400 hover:text-blue-300 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Projects
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Add New Project</h2>
            <div className="max-w-2xl">
                <ProjectForm />
            </div>
        </div>
    );
}
