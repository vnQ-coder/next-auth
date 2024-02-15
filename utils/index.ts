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
