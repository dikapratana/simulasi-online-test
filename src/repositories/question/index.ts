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
  const res = await api.post<BaseResponse<{ message?: string }>>(
    "/api/studentanswer/create",
    payload,
  );
  return res.data;
};
