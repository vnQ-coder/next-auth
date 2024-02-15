import toast from "react-hot-toast";
import { randomBytes } from "crypto";

const serverUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/`;

export const sendRequest = async (url = "", config = {}) => {
  try {
    let response = await fetch(serverUrl + url, config);
    if (response.status === 200) {
      const responseData = await response.json();
      if (responseData.code === 200) {
        return responseData.data ? responseData.data : true;
      } else {
        toast.error(responseData.message);
        return false;
      }
    } else {
      toast.error("Something went wrong.");
      return false;
    }
  } catch (err) {
    console.log(err, "error");
    toast.error("Something went wrong.");
    return false;
  }
};

export const postRequestBody = (data: any) => {
  return {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };
};

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
