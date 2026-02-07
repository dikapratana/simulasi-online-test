import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetQuestion,
  PostStudentAnswer,
} from "../../../../../repositories/question";

export function useGetQuestion(params?: QuestionParams, enabled = true) {
  const result = useQuery({
    queryKey: ["questions", params],
    queryFn: () => GetQuestion(params),
    enabled,
  });

  return {
    ...result,
    data: result.data,
  };
}

export function usePostStudentAnswer() {
  const result = useMutation({
    mutationFn: PostStudentAnswer,
  });

  return {
    ...result,
    data: result.data,
  };
}