import api from "../../utils/axios";

export const GetQuestion = async (
  params?: QuestionParams,
): Promise<Question[]> => {
  const res = await api.get<BaseResponse<Question[]>>("/api/question/list", {
    params,
  });

  const data = (res.data?.data ?? res.data) as Question[];
  return data;
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
