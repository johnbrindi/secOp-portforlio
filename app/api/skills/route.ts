import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

function parseSkills(body: any) {
  const skillsString = typeof body.skills === 'string' ? body.skills : '';
  return skillsString
    .split(',')
    .map((skill: string) => skill.trim())
    .filter(Boolean)
    .slice(0, 200);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const skills = parseSkills(body);

    if (skills.length === 0) {
      return NextResponse.json({ error: 'Please provide at least one skill.' }, { status: 400 });
    }

    const records = skills.map((name: string) => ({ name, category: 'General' }));

    await prisma.skills.createMany({ data: records, skipDuplicates: true });

    return NextResponse.json({ data: { created: records.length } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create skills.' }, { status: 400 });
  }
}
