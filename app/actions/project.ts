'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tagsString = formData.get('tags') as string;
    const tags = tagsString ? tagsString.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
    const image_url = formData.get('image') as string || '';
    const link = formData.get('link') as string || '';

    try {
        await prisma.projects.create({
            data: {
                title,
                description,
                image_url,
                tags,
                link,
            },
        });
    } catch (error: any) {
        console.error('Error creating project:', error);
        throw new Error(error.message || 'Failed to create project');
    }

    revalidatePath('/admin/projects');
}
