import { decrypt, encrypt } from "./crypto";

const USERDATA = "userdata";
const STEP = "step";

export function setUserData(value: UserData) {
  const encrypted = encrypt(value);
  localStorage.setItem(USERDATA, encrypted);
}

export function getUserData(): UserData | null {
  const data = localStorage.getItem(USERDATA);
  if (!data) return null;

  return decrypt<UserData>(data);
}

export function clearUserData() {
  localStorage.removeItem(USERDATA);
}
