type QuestionParams = {
  student_id: number;
  set_question: string;
};

type QuestionOption = {
  id: number;
  question_id: number;
  key: string;
  text: string;
  is_true: number;
  created_at: string;
  updated_at: string;
};

type Question = {
  id: number;
  set_question: string;
  question: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  option: QuestionOption[];
};

type StudentAnswer = {
  question_id: number;
  answer_id: number | string;
};

type StudentFormData = {
  student_id: number;
  student_answer_id: number;
  student_answers: StudentAnswer[];
  duration?: string;
  timestamp?: number;
};