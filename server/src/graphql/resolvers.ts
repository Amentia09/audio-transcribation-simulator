import { randomUUID } from 'node:crypto';

const currentJobs = [
    {
        id: '1234-1234-0004',
        status: 'COMPLETED',
    },
    {
        id: '1234-1234-0002',
        status: 'FAILED',
    },
    {
        id: '1234-1234-0003',
        status: 'PROCESSING',
    }
];

export const resolvers = {
    Query: {
        job: (_: any, { id }: { id: string }) => {
            return currentJobs.find((job) => job.id === id);
        },
        jobs: () => {
            return currentJobs;
        }
    },
    Mutation: {
        createJob: (_: any, { status }: { status: string }) => {
            const newJob = {
                id: randomUUID(),
                status: status
            };
            currentJobs.push(newJob);
            return newJob;
        }
    }
};