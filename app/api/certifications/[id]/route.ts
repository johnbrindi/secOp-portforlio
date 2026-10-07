import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

function validateId(id: string) {
  if (!id) {
    throw new Error('Certification id is required.');
  }
}

function normalizeString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validateUrl(value: string) {
  if (!value) return null;
  try {
    return new URL(value).toString();
  } catch {
    throw new Error('The provided URL is invalid.');
  }
}

function buildCertificationPayload(body: any) {
  const title = normalizeString(body.title, 255);
  const issuer = normalizeString(body.issuer, 120);
  const date_issued = normalizeString(body.date, 60);
  const description = normalizeString(body.description, 1000);
  const link = validateUrl(normalizeString(body.link, 2048)) || null;
  const image_url = validateUrl(normalizeString(body.image, 2048)) || null;

  if (!title || !issuer || !date_issued || !description) {
    throw new Error('Title, issuer, date, and description are required.');
  }

  return { title, issuer, date_issued, description, link, image_url };
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    validateId(id);
    const body = await request.json();
    const payload = buildCertificationPayload(body);
    const certification = await prisma.certifications.update({ where: { id }, data: payload });
    return NextResponse.json({ data: certification });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update certification.' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    validateId(id);
    await prisma.certifications.delete({ where: { id } });
    return NextResponse.json({ data: { id } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete certification.' }, { status: 400 });
  }
}
