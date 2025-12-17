'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlog(formData: FormData) {
    const supabase = createAdminClient();

    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const tags = (formData.get('tags') as string)?.split(',').map((tag) => tag.trim()) || [];
    const featured = formData.get('featured') === 'on';

    const imageFile = formData.get('imageFile') as File | null;
    let image_url = formData.get('image') as string || '';

    if (imageFile && imageFile.size > 0) {
        // TODO: Implement Storage Upload
    }

    const { error } = await supabase.from('posts').insert([
        {
            title,
            excerpt,
            content,
            category,
            tags,
            featured,
            image_url,
        },
    ]);

    if (error) {
        console.error('Error creating post:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/blogs');
    // We stay on the page to see the new item in the list (if we were fetching)
    // or we can redirect. User wants to "view it in my admin dashboard".
    // The list updates automatically on revalidation if it's a SC.
}
