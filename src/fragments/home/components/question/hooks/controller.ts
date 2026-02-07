import { useMemo, useState } from "react";
import {
  getFormData,
  getTimerStorage,
  getUserData,
  setResultStorage,
  upsertAnswer,
} from "../../../../../utils/storage";
import { usePostStudentAnswer } from "./queries";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../../../../components/alert";

const ESSAY_QUESTION_ID = 999;
const LAST_QUESTION_STEP = 6;

type ControllerParams = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onFinish: () => void;
  questions: Question[];
  allQuestions: Question[];
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const padded = (value: number) => String(value).padStart(2, "0");
  return `${padded(minutes)}:${padded(seconds)}`;
}

export default function useController(params?: ControllerParams) {
  const getInitialData = () => {
    const formData = getFormData();

    const answers: Record<number, number | string> = {};
    let essay = "";

    if (formData) {
      formData.student_answers.forEach((a) => {
        answers[a.question_id] = a.answer_id;

        if (a.question_id === ESSAY_QUESTION_ID) {
          essay = String(a.answer_id);
        }
      });
    }

    return {
      answers,
      essay,
    };
  };

  const initial = getInitialData();

  const [answers, setAnswers] = useState<Record<number, number | string>>(
    () => initial.answers,
  );

  const [essay, setEssay] = useState<string>(() => initial.essay);
  const { mutate, isPending } = usePostStudentAnswer();

  const handleSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    upsertAnswer({
      question_id: questionId,
      answer_id: optionId,
    });
  };

  const handleEssayChange = (value: string) => {
    setEssay(value);

    upsertAnswer({
      question_id: ESSAY_QUESTION_ID,
      answer_id: value,
    });
  };

  const handleFinish = (callbacks?: {
    onSuccess?: () => void;
    onError?: (message: string) => void;
  }) => {
    const userData = getUserData();
    const formData = getFormData();

    if (!userData || !formData) {
      return { ok: false, message: "Incomplete data. Please try again." };
    }

    const payload: StudentFormData = {
      ...formData,
      duration: formatDuration(getTimerStorage()),
      timestamp: Math.floor(Date.now() / 1000),
    };

    mutate(payload, {
      onSuccess: () => {
        setResultStorage({
          finishedAt: Date.now(),
          durationSeconds: getTimerStorage(),
        });
        callbacks?.onSuccess?.();
      },
      onError: (error) => {
        callbacks?.onError?.(error.message);
      },
    });

    return { ok: true };
  };

  const isEssayStep = params ? params.step === LAST_QUESTION_STEP : false;

  const handleNext = () => {
    if (!params) return;

    const { step, setStep, allQuestions, onFinish } = params;

    if (step >= LAST_QUESTION_STEP) {
      const unanswered = allQuestions.filter(
        (q) => answers[q.id] === undefined,
      );
      const hasMissing = unanswered.length > 0 || !essay.trim();

      const finish = () => {
        const result = handleFinish({
          onSuccess: () => {
            showSuccess(
              "Success",
              "You have completed all tests!. \n Please claim your result at the Yes2Makaysia Info Day",
            ).then(() => {
              onFinish();
            });
          },
          onError: (message) => {
            showError("Error", message);
          },
        });

        if (!result.ok) {
          showError("Error", result.message);
        }
      };

      if (hasMissing) {
        showConfirm({
          title: "Unanswered Questions",
          text: "Some questions are still unanswered. Please check your answers before finishing.",
          confirmText: "Finish anyway",
          cancelText: "Check",
        }).then((result) => {
          if (result.isConfirmed) {
            finish();
          }
        });
        return;
      }

      finish();
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!params) return;
    if (params.step <= 2) return;
    params.setStep((prev) => prev - 1);
  };

  const reorderedQuestions = useMemo(() => {
    if (!params) return [];
    const list = params.questions;

    if (list.length !== 6) {
      return list.map((q, i) => ({ ...q, _index: i }));
    }

    const half = Math.ceil(list.length / 2);

    const left = list.slice(0, half).map((q, i) => ({ ...q, _index: i }));

    const right = list
      .slice(half)
      .map((q, i) => ({ ...q, _index: i + half }));

    const result: ((typeof list)[number] & { _index: number })[] = [];

    for (let i = 0; i < half; i++) {
      if (left[i]) result.push(left[i]);
      if (right[i]) result.push(right[i]);
    }

    return result;
  }, [params]);

  return {
    answers,
    essay,
    isPending,

    handleSelect,
    handleEssayChange,
    handleFinish,
    isEssayStep,
    handleNext,
    handlePrev,
    reorderedQuestions,
  };
}
