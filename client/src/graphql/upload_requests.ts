import { gql } from "@apollo/client";

export const CREATE_UPLOAD_JOB = gql`
  mutation CreateUploadJob($filename: String!, $mime: String!, $size: Int!) {
    createUploadJob(filename: $filename, mime: $mime, size: $size) {
      job {
        id
        name
        status
        createdAt
      }
      uploadUrl
      key
    }
  }
`;
