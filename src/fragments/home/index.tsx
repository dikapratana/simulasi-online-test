import { IMAGES } from "../../configs/constants/images";
import { RefreshCw } from "lucide-react";
import QuestionFragment from "./components/question";
import HeaderFragment from "./components/header";
import ProfileFragment from "./components/profile";
import useController from "./hooks/controller";

export default function HomeFeatures() {
  const {
    step,
    setStep,
    handleReset,
    isFinished,
    setIsFinished,
    elapsedSeconds,
    currentQuestions,
    allQuestions,
  } = useController();

  return (
    <div className="bg-neutral-1 h-screen overflow-y-auto">
      <div className="flex bg-white justify-center shadow-md py-4 items-center">
        <div className="container flex justify-between">
          <img src={IMAGES.Logo} className="h-12" alt="logo" />
          <span
            className="flex gap-1 text-sm font-medium text-primary items-center justify-center cursor-pointer"
            onClick={handleReset}
          >
            <RefreshCw className="w-5 h-5 text-primary" /> Reset Form
          </span>
        </div>
      </div>
      <div className="flex justify-center py-8">
        <div className="container">
          {!isFinished && (
            <HeaderFragment step={step} elapsedSeconds={elapsedSeconds} />
          )}

          <div className="py-8">
            {step === 1 && <ProfileFragment step={step} setStep={setStep} />}
            {step >= 2 && (
              <QuestionFragment
                allQuestions={allQuestions}
                questions={currentQuestions}
                step={step}
                setStep={setStep}
                isFinished={isFinished}
                onFinish={() => setIsFinished(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
