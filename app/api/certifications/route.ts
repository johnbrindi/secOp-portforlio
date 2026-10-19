import prisma from '@/lib/prisma';
import { adminGuard } from '@/lib/auth';
import { validateCertificationInput } from '@/lib/certification';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const certifications = await prisma.certifications.findMany({
    orderBy: { created_at: 'desc' },
  });

  return NextResponse.json({ data: certifications });
}

export async function POST(request: NextRequest) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    const body = await request.json();
    const payload = validateCertificationInput(body);
    const certification = await prisma.certifications.create({ data: payload });
    return NextResponse.json({ data: certification }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create certification.' }, { status: 400 });
  }
}
