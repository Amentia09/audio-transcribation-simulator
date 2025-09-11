import type { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma.js';

export type Context = { prisma: PrismaClient };

export const createContext = async (): Promise<Context> => ({ prisma });
