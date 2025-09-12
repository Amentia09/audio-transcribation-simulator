import { S3Client } from "@aws-sdk/client-s3";

function must(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback;
  if (!v) throw new Error(`Missing env: ${name}`);
  return v.replace(/\/+$/, ""); 
}

const REGION = process.env.MINIO_REGION ?? "us-east-1";
const ACCESS = must("MINIO_ACCESS_KEY");
const SECRET = must("MINIO_SECRET_KEY");

export const BUCKET = must("MINIO_BUCKET");

const PUBLIC_ENDPOINT   = must("MINIO_PUBLIC_ENDPOINT");
const INTERNAL_ENDPOINT = must("MINIO_INTERNAL_ENDPOINT");

function makeS3(endpoint: string) {
  return new S3Client({
    region: REGION,
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId: ACCESS, secretAccessKey: SECRET },
  });
}


export const s3Presign  = makeS3(PUBLIC_ENDPOINT);
export const s3Internal = makeS3(INTERNAL_ENDPOINT);
