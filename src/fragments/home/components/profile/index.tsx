import Button from "../../../../components/button";
import { FormField } from "../../../../components/form/formfield/form-field";
import InputField from "../../../../components/form/input";
import useController from "./hooks/controller";

export default function ProfileFragment(props: ProfileFragmentProps) {
  const { form } = useController(props);
  return (
    <>
      <h1 className="text-lg font-bold text-center mb-6 mt-8">
        Student Detail
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="name"
          placeholder="Student Name (In English)"
          containerClassName="w-full"
          className="w-full"
          control={form.control}
          component={InputField}
          error={form.errors["name"]?.message}
        />
        <FormField
          name="email"
          placeholder="Email Address"
          containerClassName="w-full"
          className="w-full"
          control={form.control}
          component={InputField}
          error={form.errors["email"]?.message}
        />
        <FormField
          name="phone"
          placeholder="Phone Number"
          containerClassName="w-full"
          className="w-full"
          control={form.control}
          component={InputField}
          error={form.errors["phone"]?.message}
        />
        <FormField
          name="age"
          placeholder="Age"
          containerClassName="w-full"
          className="w-full"
          control={form.control}
          component={InputField}
          error={form.errors["age"]?.message}
        />
      </div>
      <div className="flex justify-end mt-6 sm:mt-8">
        <Button
          className="w-full sm:w-auto"
          disabled={!form.isValid || form.isPending}
          onClick={form.handleSubmit(form.onSubmit)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
