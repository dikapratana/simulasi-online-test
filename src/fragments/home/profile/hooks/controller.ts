import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { usePostProfile } from "./queries";
import { studentProfileSchema, type StudentProfileSchema } from "../schema";
import { showError } from "../../../../components/alert";
import { setUserData } from "../../../../utils/storage";

export default function useController({ setStep }: ProfileFragmentProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(studentProfileSchema),
  });

  const { mutate } = usePostProfile();

  const onSubmit = (payload: StudentProfileSchema) => {
    mutate(payload, {
      onSuccess: (res) => {
        setUserData(res.data);
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
    },
  };
}
