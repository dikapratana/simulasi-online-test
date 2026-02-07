import api from "../../utils/axios";

export const PostProfile = async (
  payload?: PosProfilePayload,
): Promise<BaseResponse<UserData>> => {
  // NOTE: sementara pakai data dummy statis (API dinonaktifkan)
  // const res = await api.post<BaseResponse<UserData>>(
  //   "/api/student/create",
  //   payload,
  // );
  // return res.data;







  console.log("Dummy payload:", payload);
  const res = await new Promise<BaseResponse<UserData>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: payload?.name ?? "sarada",
          email: payload?.email ?? "sarada@yopmail.com",
          phone: payload?.phone ?? "0822221122",
          age: payload?.age ?? "18",
          study_plan: null,
          updated_at: "2026-02-07T03:19:27.000000Z",
          created_at: "2026-02-07T03:19:27.000000Z",
          id: 263,
          student_answer_id: 354,
          set_question: "SetA",
        },
      });
    }, 300);
  });

  return res;
};
