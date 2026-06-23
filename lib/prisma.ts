import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.warn('Warning: DATABASE_URL is missing. Prisma client will be initialized with an empty connection string.');
    }
    const adapter = new PrismaNeon({
        connectionString: connectionString || '',
    });
    return new PrismaClient({ adapter });
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
