'use client';

import { useState, useEffect, use } from 'react';
import SkillForm from '@/components/admin/SkillForm';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

const EditSkill = ({ params }) => {
    const { id } = use(params);
    const router = useRouter();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const res = await api.get(`/skills`);
                // Since our API currently gets all skills, we filter here locally or update backend to getById
                // Wait, I updated backend to only have request for getAll. I forgot getById for Skills in backend!
                // Ah, looking at my controller code:
                // exports.getSkills = ... (All)
                // I did NOT implement getSkillById in skillController.js.
                // I need to filter locally from the list or add endpoint. 
                // Filtering locally is fine for now as list is small, or I can quickly patch backend.
                // Let's filter locally for now to save a turn, as list is small. 
                const found = res.data.find(s => s._id === id);
                setSkill(found);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching skill:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchSkill();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!skill) return <div>Skill not found</div>;

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/skills" className="text-blue-400 hover:text-blue-300 flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Skills
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Edit Skill</h2>
            <div className="max-w-2xl">
                <SkillForm skill={skill} isEdit={true} />
            </div>
        </div>
    );
}

export default EditSkill;
