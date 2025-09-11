export const typeDefs = /* GraphQL */ `
  enum JobStatus { PENDING_UPLOAD PROCESSING COMPLETED FAILED }

  type Job {
    id: ID!
    status: JobStatus!
    name: String!
    s3Key: String
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
    createJob(name: String!, status: JobStatus = PROCESSING): Job!
    deleteJob(id: ID!): Job
    createUploadJob(filename: String!, mime: String!, size: Int!): CreateUploadJobPayload!
    confirmUpload(id: ID!): Job!
  }
`;
