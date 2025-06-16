import { zodResolver } from "@hookform/resolvers/zod";
import { isValidBSN } from "bsn-js";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import FormFieldDatePicker from "../../components/FormFieldDatePicker";
import { MULTI, ROUTES } from "../../constants";
import { updateStepOne } from "../../state/actions";

const stepOneFormValues = z.object({
  firstName: z.string().min(1, { message: "first name is required" }),
  lastName: z.string().min(1, { message: "last name is required" }),
  bsn: z.string().refine(
    (val) => (val ? isValidBSN(val) : true),
    () => ({
      message: "this is not a valid bsn",
    })
  ),
  dateOfBirth: z.date().optional(),
});

type StepOneFormValues = z.infer<typeof stepOneFormValues>;

function Step1() {
  const { actions, state } = useStateMachine({ updateStepOne });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StepOneFormValues>({
    resolver: zodResolver(stepOneFormValues),
    defaultValues: {
      firstName: state.data.firstName,
      lastName: state.data.lastName,
      bsn: state.data.bsn,
      dateOfBirth: state.data.dateOfBirth,
    },
  });

  const onSubmit = (data: StepOneFormValues) => {
    actions.updateStepOne(data);
    navigate(`/${ROUTES.MULTI}/${MULTI.STEP2}`);
  };

  return (
    <section>
      <h2 className="text-4xl text-center py-4">Step 1</h2>
      <form className="w-66" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="First Name"
          error={errors.firstName}
          formRegister={register("firstName")}
        />
        <FormField
          label="Last Name"
          error={errors.lastName}
          formRegister={register("lastName")}
        />
        <FormField
          label="BSN"
          error={errors.bsn}
          formRegister={register("bsn")}
        />
        <FormFieldDatePicker
          label="Date of Birth"
          control={control}
          name="dateOfBirth"
          error={errors.dateOfBirth}
        />
        <section className="py-4 flex justify-end gap-2">
          <BackButton />
          <Button caption="Next" type="submit" />
        </section>
      </form>
    </section>
  );
}

export default Step1;
