import prisma from '@/lib/prisma';
import { adminGuard } from '@/lib/auth';
import { validateCertificationInput } from '@/lib/certification';
import { NextRequest, NextResponse } from 'next/server';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateId(id: string) {
  if (!id || !UUID_PATTERN.test(id)) {
    throw new Error('A valid certification id is required.');
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    const { id } = await params;
    validateId(id);
    const body = await request.json();
    const payload = validateCertificationInput(body);
    const certification = await prisma.certifications.update({ where: { id }, data: payload });
    return NextResponse.json({ data: certification });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update certification.' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    const { id } = await params;
    validateId(id);
    await prisma.certifications.delete({ where: { id } });
    return NextResponse.json({ data: { id } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete certification.' }, { status: 400 });
  }
}
