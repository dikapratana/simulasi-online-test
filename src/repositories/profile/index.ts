import api from "../../utils/axios";

export const PostProfile = async (
  payload?: PosProfilePayload,
): Promise<BaseResponse<UserData>> => {
  // const res = await api.post("/customers", payload);
  console.log(payload);
  const res = await new Promise<BaseResponse<UserData>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: "sarada",
          email: "sarada@yopmail.com",
          phone: "0822221122",
          age: "18",
          study_plan: null,
          updated_at: "2026-02-07T03:19:27.000000Z",
          created_at: "2026-02-07T03:19:27.000000Z",
          id: 263,
          student_answer_id: 354,
          set_question: "SetA",
        },
      });
    }, 500);
  });

  return res;
};
