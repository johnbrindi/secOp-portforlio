'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';

export async function updateProfile(formData: FormData) {
    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;
    const image_url = formData.get('image') as string || '';

    try {
        const profile = await prisma.profiles.findFirst();
        
        if (!profile) {
            // Create a new profile if none exists
            await prisma.profiles.create({
                data: {
                    id: randomUUID(),
                    name,
                    title,
                    bio,
                    image_url,
                    updated_at: new Date(),
                },
            });
        } else {
            // Update the existing profile
            await prisma.profiles.update({
                where: { id: profile.id },
                data: {
                    name,
                    title,
                    bio,
                    image_url,
                    updated_at: new Date(),
                },
            });
        }
    } catch (error: any) {
        console.error('Error updating profile:', error);
        throw new Error(error.message || 'Failed to update profile');
    }

    revalidatePath('/admin/profile');
}
