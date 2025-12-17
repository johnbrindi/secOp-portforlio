'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    const supabase = createAdminClient();

    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;

    let image_url = formData.get('image') as string || '';
    const imageFile = formData.get('imageFile') as File | null;
    // TODO: Buffer/Storage upload implementation

    // Hardcode ID or assume single user for this simplified portfolio
    // Often the user ID is fixed or we query the first user.
    // Since we are bypassing auth, we can't get 'user.id' from session.
    // Let's query the profiles table or use a fixed ID if known.
    // For now, let's look up the first profile or create one?
    // Or better, let the user pass the ID if available in form? No, that's insecure if public.
    // We'll update *all* profiles or the first one found.

    const { data: profiles } = await supabase.from('profiles').select('id').limit(1);
    const userId = profiles && profiles.length > 0 ? profiles[0].id : null;

    if (!userId) {
        // If no profile exists, we can't update. We'd need to Insert with a new UUID.
        // But 'id' references auth.users usually.
        throw new Error("No profile found to update. Please create a user in Supabase Auth first.");
    }

    const { error } = await supabase.from('profiles').update({
        name,
        title,
        bio,
        image_url,
        updated_at: new Date().toISOString(),
    }).eq('id', userId);

    if (error) {
        console.error('Error updating profile:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/profile');
}
