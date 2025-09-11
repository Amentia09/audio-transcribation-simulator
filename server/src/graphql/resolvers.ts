import type { Context } from './context.js';
import { JobStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { presignUpload, presignDownload,objectExists } from '../storage/presign.js';

const duration = (ms: number) => new Promise((r) => setTimeout(r, ms));
 
export const resolvers = {
  Query: {
    jobs: (_: unknown, __: unknown, { prisma }: Context) =>
      prisma.job.findMany({ orderBy: { createdAt: 'desc' } }),
    job: (_: unknown, { id }: { id: string }, { prisma }: Context) =>
      prisma.job.findUnique({ where: { id } }),
  },

  Mutation: {
    createUploadJob: async (
        _: unknown,
        { filename, mime }: { filename: string; mime: string; size: number },
        { prisma }: Context
      ) => {
        const id = uuidv4();
        const key = `uploads/${id}/${filename}`;
      
        const job = await prisma.job.create({
          data: {
            id,
            name: filename,
            status: JobStatus.PENDING_UPLOAD,
            s3Key: key,
            transcriptionText: '',
          },
        });
      
        const uploadUrl = await presignUpload(key, mime, 300);
      
        
        (async () => {
          try {
            await duration(15000); 
      
            const shouldFail = Math.random() < 0.33;
            await prisma.job.update({
              where: { id },
              data: shouldFail
                ? { status: JobStatus.FAILED }
                : {
                    status: JobStatus.COMPLETED,
                    transcriptionText:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                  },
            });
          } catch (e) {
            console.error('Error processing job:', e);
            await prisma.job.update({
              where: { id },
              data: { status: JobStatus.FAILED },
            });
          }
        })();
      
        return { job, uploadUrl, key };
      },
    },
};
