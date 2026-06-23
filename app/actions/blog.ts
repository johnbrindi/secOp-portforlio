'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBlog(formData: FormData) {
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const tagsString = formData.get('tags') as string;
    const tags = tagsString ? tagsString.split(',').map((t) => t.trim()).filter(Boolean) : [];
    const image_url = formData.get('image') as string || '';
    const featured = formData.get('featured') === 'on' || formData.get('featured') === 'true';

    try {
        await prisma.posts.create({
            data: {
                title,
                excerpt,
                content,
                category,
                tags,
                image_url,
                featured,
            },
        });
    } catch (error: any) {
        console.error('Error creating post:', error);
        throw new Error(error.message || 'Failed to create blog post');
    }

    revalidatePath('/admin/blogs');
}
