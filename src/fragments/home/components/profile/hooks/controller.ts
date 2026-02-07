import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { usePostProfile } from "./queries";
import { studentProfileSchema, type StudentProfileSchema } from "../schema";
import {
  getFormData,
  getUserData,
  setFormData,
  setUserData,
} from "../../../../../utils/storage";
import { showError } from "../../../../../components/alert";

export default function useController({ setStep }: ProfileFragmentProps) {
  const existingUser = getUserData();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      name: existingUser?.name ?? "",
      email: existingUser?.email ?? "",
      phone: existingUser?.phone ?? "",
      age: existingUser?.age ?? "",
    },
  });

  const { mutate, isPending } = usePostProfile();

  const onSubmit = (payload: StudentProfileSchema) => {
    const existingForm = getFormData();

    mutate(payload, {
      onSuccess: (res) => {
        setUserData(res.data);
        const answers = existingForm?.student_answers ?? [];
        setFormData({
          student_id: res.data.id,
          student_answer_id: res.data.student_answer_id,
          student_answers: answers,
        });
        setStep((prev) => prev + 1);
      },
      onError: (error) => {
        showError("Terjadi Kesalahan", error.message);
      },
    });
  };

  return {
    form: {
      control,
      errors,
      isValid,
      handleSubmit,
      onSubmit,
      isPending,
    },
  };
}
