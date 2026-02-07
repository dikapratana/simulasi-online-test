import api from "../../utils/axios";
import { DATA } from "./data";

export const GetQuestion = async (
  params?: QuestionParams,
): Promise<Question[]> => {
  // NOTE: sementara pakai data dummy statis (API dinonaktifkan)
  // const res = await api.get<BaseResponse<Question[]>>("/api/question/list", {
  //   params,
  // });
  // const data = (res.data?.data ?? res.data) as Question[];
  // return data;







  console.log("Dummy params:", params);
  const res = await new Promise<Question[]>((resolve) => {
    setTimeout(() => {
      resolve(DATA);
    }, 300);
  });

  return res;
};

export const PostStudentAnswer = async (
  payload: StudentFormData,
): Promise<BaseResponse<{ message?: string }>> => {
  // NOTE: sementara pakai data dummy statis (API dinonaktifkan)
  // const res = await api.post<BaseResponse<{ message?: string }>>(
  //   "/api/studentanswer/create",
  //   payload,
  // );
  // return res.data;







  console.log("Dummy submit:", payload);
  const res = await new Promise<BaseResponse<{ message?: string }>>(
    (resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: "OK",
          },
        });
      }, 300);
    },
  );

  return res;
};
