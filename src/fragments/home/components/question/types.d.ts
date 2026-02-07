type QuestionFragmentProps = {
  allQuestions: Question[];
  questions: Question[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isFinished: boolean;
  onFinish: () => void;
};