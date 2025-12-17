'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
    const supabase = createAdminClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = (formData.get('tags') as string)?.split(',').map((tag) => tag.trim()) || [];

    let image_url = formData.get('image') as string || '';
    const imageFile = formData.get('imageFile') as File | null;
    // TODO: Upload imageFile handling

    const { error } = await supabase.from('projects').insert([
        {
            title,
            description,
            tags,
            image_url,
        },
    ]);

    if (error) {
        console.error('Error creating project:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/projects');
}
