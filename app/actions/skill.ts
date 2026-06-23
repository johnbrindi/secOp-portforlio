'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createSkill(formData: FormData) {
    const skillsString = formData.get('skills') as string;
    const skillsArray = skillsString.split(',').map((s) => s.trim()).filter(Boolean);

    const records = skillsArray.map((name) => ({
        name,
        category: 'General', // Default category
    }));

    if (records.length > 0) {
        try {
            await prisma.skills.createMany({
                data: records,
            });
        } catch (error: any) {
            console.error('Error creating skills:', error);
            throw new Error(error.message || 'Failed to create skills');
        }
    }

    revalidatePath('/admin/skills');
}
