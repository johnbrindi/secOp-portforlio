'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createSkill(formData: FormData) {
    const supabase = createAdminClient();

    const skillsString = formData.get('skills') as string;
    const skillsArray = skillsString.split(',').map(s => s.trim()).filter(Boolean);

    // Since the UI treats skills as a comma-separated list, 
    // and the DB schema has a 'skills' table where each row is a skill (name, category),
    // we might need to decide how to handle this.
    // The original API loop was effectively "add new skills".
    // Let's implement bulk insert for simplicity as per previous logic.

    // Note: This logic assumes we just want to ADD skills.
    // If we wanted to "Update the list", we'd delete old ones or use upsert.
    // Given the limited context of the simple app, let's insert new ones.

    const records = skillsArray.map(name => ({
        name,
        category: 'General' // Default category
    }));

    if (records.length > 0) {
        const { error } = await supabase.from('skills').insert(records);
        if (error) {
            console.error('Error creating skills:', error);
            throw new Error(error.message);
        }
    }

    revalidatePath('/admin/skills');
}
