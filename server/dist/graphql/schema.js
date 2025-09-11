export const typeDefs = /* GraphQL */ `
  enum JobStatus { PROCESSING COMPLETED FAILED }

  type Job {
    id: ID!
    status: JobStatus!
    name: String!
    s3key: String
    s3Url: String
    transcriptionText: String
    createdAt: String!
    updatedAt: String!
  }

  
  type CreateUploadJobPayload {
    job: Job!
    uploadUrl: String!
    key: String!
  }

  type Query {
    jobs: [Job!]!
    job(id: ID!): Job
  }

  type Mutation {
  createUploadJob(filename: String!, mime: String!, size: Int!): CreateUploadJobPayload!
  deleteJob(id: ID!): Job
  }
`;
