import { randomBytes } from "crypto";

export const generatePassword = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
  const charactersLength = characters.length;
  const randomBytesBuffer = randomBytes(length);
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytesBuffer.readUInt8(i) % charactersLength;
    password += characters.charAt(randomIndex);
  }
  return password;
};

export const fileTypeResponseHelper = (
  fileType: "image" | "video" | "audio",
  file: File
) => {
  try {
    let mimetype = file.type.split("/")[0];
    if (mimetype !== fileType) {
      console.log(mimetype, "here");
      return {
        code: 400,
        message: `Only ${fileType} file is allowed`,
      };
    } else return null;
  } catch (err) {
    console.log(err);
    return {
      code: 400,
      message: `Only ${fileType} file is allowed`,
    };
  }
};

export const fileSizeResponseHelper = (maxSize: number, file: File) => {
  try {
    let size = file.size / (1024 * 1024);
    if (size > maxSize) {
      console.log(size, "size");
      return {
        code: 400,
        message: `Image size must be less than or equal to ${maxSize}MB`,
      };
    } else return null;
  } catch (err) {
    console.log(err);
    return {
      code: 400,
      message: `Image size must be less than or equal to ${maxSize}MB`,
    };
  }
};
