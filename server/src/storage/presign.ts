import { PutObjectCommand, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Presign, s3Internal, BUCKET } from "./minio.js";

export const presignUpload = (key: string, contentType: string, ttl = 300) =>
  getSignedUrl(
    s3Presign,
    new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: ttl }
  );

export const presignDownload = (key: string, ttl = 300) =>
  getSignedUrl(
    s3Presign,
    new GetObjectCommand({ Bucket: BUCKET, Key: key }),
    { expiresIn: ttl }
  );

export async function objectExists(key: string) {
  try {
    await s3Internal.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}
