export const typeDefs = `
    type Job {
        id: String!
        status: String!
    }

    type Query {
        jobs: [Job!]!
        job(id: String): Job
    }

    type Mutation {
        createJob(status: String): Job
    }
`;