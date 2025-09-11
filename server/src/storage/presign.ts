import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const INTERNAL_ENDPOINT = process.env.MINIO_INTERNAL_ENDPOINT!;
const PUBLIC_ENDPOINT = process.env.MINIO_PUBLIC_ENDPOINT!;
export const BUCKET = process.env.MINIO_BUCKET!;


export const s3 = new S3Client({
  region: process.env.MINIO_REGION!,
  endpoint: INTERNAL_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});


function toPublicUrl(url: string): string {
  return url.replace(INTERNAL_ENDPOINT, PUBLIC_ENDPOINT);
}


export const presignUpload = async (key: string, contentType: string, ttl = 300) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: ttl });
  return toPublicUrl(url);
};


export const presignDownload = async (key: string, ttl = 300) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: ttl });
  return toPublicUrl(url);
};


export async function objectExists(key: string) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}
