'use server';

import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { validateCertificationInput } from '@/lib/certification';
import { revalidatePath } from 'next/cache';

export async function createCertification(formData: FormData) {
  await requireAdmin();

  const payload = validateCertificationInput({
    title: formData.get('title'),
    issuer: formData.get('issuer'),
    date: formData.get('date'),
    description: formData.get('description'),
    link: formData.get('link'),
    image: formData.get('image'),
  });

  try {
    await prisma.certifications.create({
      data: payload,
    });
  } catch (error: any) {
    console.error('Error creating certification:', error);
    throw new Error(error.message || 'Failed to create certification');
  }

  revalidatePath('/admin/certifications');
}

export async function updateCertification(id: string, formData: FormData) {
  await requireAdmin();

  if (!id || typeof id !== 'string') {
    throw new Error('Certification id is required to update a record.');
  }

  const payload = validateCertificationInput({
    title: formData.get('title'),
    issuer: formData.get('issuer'),
    date: formData.get('date'),
    description: formData.get('description'),
    link: formData.get('link'),
    image: formData.get('image'),
  });

  try {
    await prisma.certifications.update({
      where: { id },
      data: payload,
    });
  } catch (error: any) {
    console.error('Error updating certification:', error);
    throw new Error(error.message || 'Failed to update certification');
  }

  revalidatePath('/admin/certifications');
}

export async function deleteCertification(id: string) {
  await requireAdmin();

  if (!id || typeof id !== 'string') {
    throw new Error('Certification id is required to delete a record.');
  }

  try {
    await prisma.certifications.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error('Error deleting certification:', error);
    throw new Error(error.message || 'Failed to delete certification');
  }

  revalidatePath('/admin/certifications');
}
