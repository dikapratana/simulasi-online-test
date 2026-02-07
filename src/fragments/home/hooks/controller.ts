import { useEffect, useMemo, useState } from "react";

import {
  clearFormData,
  clearResultStorage,
  clearUserData,
  clearTimerStorage,
  getFormData,
  getResultStorage,
  getStepStorage,
  getTimerStorage,
  getUserData,
  setStepStorage,
  setTimerStorage,
} from "../../../utils/storage";

import { useGetQuestion } from "../components/question/hooks/queries";

export default function useController() {
  const initialStep = getStepStorage();
  const resultData = getResultStorage();
  const userdata = getUserData();
  const formData = getFormData();

  const initialStepValue = Number(initialStep ?? "1");
  const [step, setStep] = useState<number>(
    resultData ? Math.max(initialStepValue, 6) : initialStepValue,
  );

  const [isFinished, setIsFinished] = useState(!!resultData);
  const [elapsedSeconds, setElapsedSeconds] = useState(() => getTimerStorage());

  const { data } = useGetQuestion(
    {
      student_id: Number(userdata?.id),
      set_question: userdata?.set_question ?? "",
    },
    !!(userdata?.id && userdata?.set_question),
  );

  const questionsPerStep = 6;

  const currentQuestions = useMemo(() => {
    if (!data || step < 2 || step > 5) return [];

    const startIndex = (step - 2) * questionsPerStep;
    const endIndex = startIndex + questionsPerStep;

    return data.slice(startIndex, endIndex);
  }, [data, step]);

  useEffect(() => {
    setStepStorage(step);
  }, [step]);

  useEffect(() => {
    if (step < 2 || isFinished) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        setTimerStorage(next);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [step, isFinished]);

  const handleReset = () => {
    clearUserData();
    clearFormData();
    setStepStorage(1);
    clearTimerStorage();
    clearResultStorage();

    window.location.reload();
  };

  return {
    step,
    setStep,
    handleReset,
    isFinished,
    setIsFinished,
    elapsedSeconds,
    setElapsedSeconds,
    userdata,
    formData,

    currentQuestions,
    allQuestions: data ?? [],
  };
}
