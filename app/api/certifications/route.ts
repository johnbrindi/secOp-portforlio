import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const MAX_TITLE_LENGTH = 255;
const MAX_ISSUER_LENGTH = 120;
const MAX_DATE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_LINK_LENGTH = 2048;
const MAX_IMAGE_URL_LENGTH = 2048;

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
  const title = normalizeString(body.title, MAX_TITLE_LENGTH);
  const issuer = normalizeString(body.issuer, MAX_ISSUER_LENGTH);
  const date_issued = normalizeString(body.date, MAX_DATE_LENGTH);
  const description = normalizeString(body.description, MAX_DESCRIPTION_LENGTH);
  const link = validateUrl(normalizeString(body.link, MAX_LINK_LENGTH)) || null;
  const image_url = validateUrl(normalizeString(body.image, MAX_IMAGE_URL_LENGTH)) || null;

  if (!title || !issuer || !date_issued || !description) {
    throw new Error('Title, issuer, date, and description are required.');
  }

  return {
    title,
    issuer,
    date_issued,
    description,
    link,
    image_url,
  };
}

export async function GET() {
  const certifications = await prisma.certifications.findMany({
    orderBy: { created_at: 'desc' },
  });

  return NextResponse.json({ data: certifications });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = buildCertificationPayload(body);
    const certification = await prisma.certifications.create({ data: payload });
    return NextResponse.json({ data: certification }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create certification.' }, { status: 400 });
  }
}
