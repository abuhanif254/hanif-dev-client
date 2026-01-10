'use client';

import SkillForm from '../../../../components/admin/SkillForm';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AddSkillPage() {
    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/skills" className="text-blue-400 hover:text-blue-300 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Skills
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Add New Skill</h2>
            <div className="max-w-2xl">
                <SkillForm />
            </div>
        </div>
    );
}
