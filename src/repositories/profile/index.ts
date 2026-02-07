import api from "../../utils/axios";

export const PostProfile = async (
  payload?: PosProfilePayload,
): Promise<BaseResponse<UserData>> => {
  const formData = new FormData();
  if (payload) {
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone);
    formData.append("age", payload.age);
  }

  const res = await api.post<BaseResponse<UserData>>(
    "/student/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};
