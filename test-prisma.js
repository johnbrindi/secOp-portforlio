require('dotenv').config();
console.log('DATABASE_URL starts with:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) : 'MISSING');
console.log('SANITY_PROJECT_ID:', process.env.SANITY_PROJECT_ID || 'MISSING');
const { PrismaClient } = require('@prisma/client');
async function test() {
  try {
    const prisma = new PrismaClient();
    console.log('Prisma initialized successfully');
    await prisma.$disconnect();
  } catch (e) {
    console.error('Prisma failed:', e.message);
  }
}
test();
