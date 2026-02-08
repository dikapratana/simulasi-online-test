import api from "../../utils/axios";

export const GetQuestion = async (
  params?: QuestionParams,
): Promise<Question[]> => {
  const res = await api.get<Question[]>("/api/question/list", {
    params,
  });
  return res.data;
};

export const PostStudentAnswer = async (
  payload: StudentFormData,
): Promise<BaseResponse<{ message?: string }>> => {
  const formData = new FormData();
  formData.append("student_id", String(payload.student_id));
  formData.append("student_answer_id", String(payload.student_answer_id));
  formData.append("student_answers", JSON.stringify(payload.student_answers));
  if (payload.duration) {
    formData.append("duration", payload.duration);
  }
  if (payload.timestamp) {
    formData.append("timestamp", String(payload.timestamp));
  }

  const res = await api.post<BaseResponse<{ message?: string }>>(
    "/api/studentanswer/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};
