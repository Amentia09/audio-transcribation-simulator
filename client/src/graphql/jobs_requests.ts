import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query {
    jobs {
      id
      name
      status
      transcriptionText
      createdAt
      updatedAt
      s3Url
    }
  }
`;
