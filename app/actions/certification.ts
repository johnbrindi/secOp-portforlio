'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createCertification(formData: FormData) {
    const supabase = createAdminClient();

    const title = formData.get('title') as string;
    const issuer = formData.get('issuer') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;

    // Image handling placeholder
    const image_url = formData.get('image') as string || '';
    // TODO: Upload imageFile to bucket if present

    const { error } = await supabase.from('certifications').insert([
        {
            title,
            issuer,
            date_issued: date, // Mapping 'date' form field to 'date_issued' column
            description,
            link,
            image_url,
        },
    ]);

    if (error) {
        console.error('Error creating certification:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/certifications');
}
