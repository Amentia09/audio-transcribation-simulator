export interface Job {
    id: string;
    name: string;
    status: string;
    transcriptionText: string;
    createdAt: string;
    updatedAt: string;
    s3Url: string;
}

export interface CreateUploadJobResponse {
    createUploadJob: {
      job: Job;
      uploadUrl: string;
      key: string;
    }
}

export interface CreateUploadJobVars {
    filename: string;
    mime: string;
    size: number;
  }