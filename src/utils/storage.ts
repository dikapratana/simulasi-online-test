import { decrypt, encrypt } from "./crypto";

const USERDATA = "userdata";
const FORMDATA = "formData";
const STEP = "step";
const TIMER = "timer";
const RESULT = "result";



export function setStepStorage(value: number) {
  localStorage.setItem(STEP, value?.toString());
}

export function getStepStorage(): string | null {
  const data = localStorage.getItem(STEP);
  if (!data) return null;

  return data;
}

export function clearStepStorage() {
  localStorage.removeItem(STEP);
}



export function setTimerStorage(value: number) {
  localStorage.setItem(TIMER, value.toString());
}

export function getTimerStorage(): number {
  const data = localStorage.getItem(TIMER);
  if (!data) return 0;
  const parsed = Number(data);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function clearTimerStorage() {
  localStorage.removeItem(TIMER);
}

export function setResultStorage(value: { finishedAt: number; durationSeconds: number }) {
  localStorage.setItem(RESULT, JSON.stringify(value));
}

export function getResultStorage():
  | { finishedAt: number; durationSeconds: number }
  | null {
  const data = localStorage.getItem(RESULT);
  if (!data) return null;
  try {
    const parsed = JSON.parse(data) as {
      finishedAt: number;
      durationSeconds: number;
    };
    if (!parsed || typeof parsed.finishedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearResultStorage() {
  localStorage.removeItem(RESULT);
}



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



export function setFormData(value: StudentFormData) {
  const encrypted = encrypt(value);
  localStorage.setItem(FORMDATA, encrypted);
}

export function getFormData(): StudentFormData | null {
  const data = localStorage.getItem(FORMDATA);
  if (!data) return null;

  return decrypt<StudentFormData>(data);
}

export function clearFormData() {
  localStorage.removeItem(FORMDATA);
}


export function upsertAnswer(answer: StudentAnswer) {
  const existing = getFormData();

  if (!existing) return;

  const index = existing.student_answers.findIndex(
    (a) => a.question_id === answer.question_id,
  );


  if (index !== -1) {
    existing.student_answers[index] = answer;
  }

  else {
    existing.student_answers.push(answer);
  }

  setFormData(existing);
}
