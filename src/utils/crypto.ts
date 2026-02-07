import CryptoJS from "crypto-js";
import { ENV } from "../configs/constants/env";

const SECRET_KEY = ENV.cryptoSecretKey;

export const encrypt = (data: object): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decrypt = <T>(cipher: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) return null;

    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};
