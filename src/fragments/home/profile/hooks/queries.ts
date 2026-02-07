import { useMutation } from "@tanstack/react-query";
import { PostProfile } from "../../../../repositories/profile";

export function usePostProfile() {
  const result = useMutation({
    mutationFn: PostProfile,
  });
  return {
    ...result,
    data: result.data,
  };
}
