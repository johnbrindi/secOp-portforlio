'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const MAX_TITLE_LENGTH = 255;
const MAX_ISSUER_LENGTH = 120;
const MAX_DATE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_LINK_LENGTH = 2048;
const MAX_IMAGE_URL_LENGTH = 2048;

function normalizeText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validateUrl(value: string): string | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).toString();
  } catch {
    throw new Error('Certification link must be a valid URL.');
  }
}

function validateCertificationInput(input: {
  title?: unknown;
  issuer?: unknown;
  date?: unknown;
  description?: unknown;
  link?: unknown;
  image?: unknown;
}) {
  const title = normalizeText(input.title, MAX_TITLE_LENGTH);
  const issuer = normalizeText(input.issuer, MAX_ISSUER_LENGTH);
  const date = normalizeText(input.date, MAX_DATE_LENGTH);
  const description = normalizeText(input.description, MAX_DESCRIPTION_LENGTH);
  const linkValue = normalizeText(input.link, MAX_LINK_LENGTH);
  const imageUrl = normalizeText(input.image, MAX_IMAGE_URL_LENGTH);

  if (!title) {
    throw new Error('Certification title is required.');
  }

  if (!issuer) {
    throw new Error('Certification issuer is required.');
  }

  if (!date) {
    throw new Error('Certification date is required.');
  }

  if (!description) {
    throw new Error('Certification description is required.');
  }

  return {
    title,
    issuer,
    date_issued: date,
    description,
    link: validateUrl(linkValue),
    image_url: validateUrl(imageUrl) || '',
  };
}

export async function createCertification(formData: FormData) {
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
