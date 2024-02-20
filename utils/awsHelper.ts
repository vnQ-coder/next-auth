import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  PutPublicAccessBlockCommand,
  PutBucketAclCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

let region: string | undefined = process.env.REGION;
let accessKeyId: string | undefined = process.env.ACCESS_KEY_ID;
let secretAccessKey: string | undefined = process.env.SECRET_ACCESS_KEY;
let S3Object: any = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};
const client = new S3Client(S3Object);
const generateObjectName = (fileName: string) =>
  `${Date.now()}-${fileName
    .replace(/[^a-zA-Z0-9\s.]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

export const S3FileUploader = async (file: File, key: string = "") => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const upload = new Upload({
    client: client,
    params: {
      Bucket: process.env.BUCKET_NAME,
      Key: key
        ? `${key}/${generateObjectName(file.name)}`
        : generateObjectName(file.name),
      Body: buffer,
      ACL: "public-read",
      ContentType: file.type,
      ContentDisposition: "inline",
    },
  });
  try {
    const data = await upload.done();
    console.log(data, "data");
    const objectUrl = data.Location;
    return objectUrl;
  } catch (e) {
    console.log("Error uploading object:", e);
    return null;
  }
};
