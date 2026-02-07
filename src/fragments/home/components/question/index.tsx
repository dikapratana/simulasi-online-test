import { useEffect } from "react";
import Button from "../../../../components/button";
import useController from "./hooks/controller";
import {
  clearFormData,
  clearResultStorage,
  clearStepStorage,
  clearTimerStorage,
  clearUserData,
  getResultStorage,
} from "../../../../utils/storage";
import { twMerge } from "../../../../utils/tw-merge";

export default function QuestionFragment({
  allQuestions,
  questions,
  step,
  setStep,
  onFinish,
  isFinished,
}: QuestionFragmentProps) {
  const {
    handleSelect,
    answers,
    essay,
    handleEssayChange,
    handleNext,
    handlePrev,
    isEssayStep,
    reorderedQuestions,
    isPending,
  } = useController({
    step,
    setStep,
    onFinish,
    questions,
    allQuestions,
  });

  useEffect(() => {
    if (!isFinished) return;
    const handleBeforeUnload = () => {
      clearUserData();
      clearFormData();
      clearStepStorage();
      clearTimerStorage();
      clearResultStorage();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFinished]);

  if (isFinished) {
    const result = getResultStorage();
    const finishedAt = result?.finishedAt
      ? new Date(result.finishedAt)
      : new Date();
    const timeText = finishedAt.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateText = finishedAt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const handleBack = () => {
      clearUserData();
      clearFormData();
      clearStepStorage();
      clearTimerStorage();
      clearResultStorage();
      window.location.reload();
    };

    return (
      <div className="mt-6 sm:mt-10 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl border border-blue-400 rounded p-6 sm:p-8 md:p-10 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-sky-500 mb-2">
            Thank You
          </h2>
          <p className="text-sm text-neutral-800">
            Your result will be sent to
          </p>
          <p className="text-base sm:text-lg font-semibold text-neutral-800 mt-1">
            ELC
          </p>

          <div className="mt-6 sm:mt-8 space-y-4 text-sm text-neutral-800">
            <div>
              <p className="text-xs text-neutral-600">Test time</p>
              <p className="text-base sm:text-lg font-semibold">{timeText}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-600">Test Date</p>
              <p className="text-base sm:text-lg font-semibold">{dateText}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleBack}
          className="mt-8 text-sm underline text-neutral-700"
        >
          back to ELC online test
        </button>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4">
      <h1 className="text-red-500 text-lg sm:text-xl font-medium text-center mt-6 sm:mt-8 mb-2">
        English Placement Test
      </h1>

      {!isEssayStep && (
        <>
          <p className="text-center text-sm text-neutral-800 font-medium">
            Please read each sentence below and indicate your answer by clicking
            on the option.
          </p>

          <p className="text-center text-sm text-neutral-800 font-medium">
            When you are finished, click on the "Next" button at the bottom.
          </p>
        </>
      )}

      {!isEssayStep && (
        <div className="grid md:grid-cols-2 gap-0 mt-8 sm:mt-12">
          {reorderedQuestions.map((question, index) => (
            <div
              key={question.id}
              className={twMerge(
                "flex flex-col justify-start md:px-6 pb-8",
                index % 2 === 0
                  ? "md:pr-6 md:border-r md:border-gray-200"
                  : "md:pl-6",
              )}
            >
              <p className="font-medium mb-3 min-h-14">
                {(step - 2) * 6 + question._index + 1}. {question.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {question.option.map((opt) => {
                  const isSelected = answers[question.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(question.id, opt.id)}
                      className={
                        "w-full text-left px-4 py-2 rounded-full border text-xs sm:text-sm transition cursor-pointer " +
                        (isSelected
                          ? "bg-green-1 text-white border-green-1"
                          : "border-gray-300 hover:bg-gray-100")
                      }
                    >
                      <span className="uppercase">{opt.key}</span>. {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {isEssayStep && (
        <div className="mt-10 ">
          <p className="text-left text-sm text-neutral-800 font-medium mb-2">
            25. Please write a paragraph on the following subject, "Why learning
            English is important for mer"
          </p>

          <textarea
            value={essay}
            onChange={(e) => handleEssayChange(e.target.value)}
            className="w-full min-h-37.5 border rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your answer here..."
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 items-stretch sm:items-center mt-10">
        <Button
          className="w-full sm:w-auto"
          onClick={handlePrev}
          disabled={step <= 2}
        >
          Previous
        </Button>

        <Button
          className="w-full sm:w-auto"
          onClick={handleNext}
          disabled={isPending}
        >
          {step >= 6 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
