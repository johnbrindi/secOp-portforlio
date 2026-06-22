'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
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
