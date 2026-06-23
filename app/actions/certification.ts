'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCertification(formData: FormData) {
    const title = formData.get('title') as string;
    const issuer = formData.get('issuer') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;
    const image_url = formData.get('image') as string || '';

    try {
        await prisma.certifications.create({
            data: {
                title,
                issuer,
                date_issued: date,
                description,
                link,
                image_url,
            },
        });
    } catch (error: any) {
        console.error('Error creating certification:', error);
        throw new Error(error.message || 'Failed to create certification');
    }

    revalidatePath('/admin/certifications');
}
