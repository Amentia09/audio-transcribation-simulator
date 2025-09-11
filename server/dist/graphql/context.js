import { prisma } from '../prisma.js';
export const createContext = async () => ({ prisma });
