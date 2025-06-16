import { zodResolver } from "@hookform/resolvers/zod";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import FormFieldCheckbox from "../../components/FormFieldCheckbox";
import FormFieldPhoneNumber from "../../components/FormFieldPhoneNumber";
import { MULTI, ROUTES } from "../../constants";
import { updateStepTwo } from "../../state/actions";

const stepTwoFormValues = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email("this is not a valid email."),
  hasPhoneNumber: z.boolean(),
  phoneNumber: z.string().refine(
    (val) => (val ? isValidPhoneNumber(val) : true),
    () => ({ message: "this is not a valid phone number" })
  ),
});

type StepTwoFormValues = z.infer<typeof stepTwoFormValues>;

function Step2() {
  const { actions, state } = useStateMachine({ updateStepTwo });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<StepTwoFormValues>({
    resolver: zodResolver(stepTwoFormValues),
    defaultValues: {
      email: state.data.email,
      hasPhoneNumber: state.data.hasPhoneNumber,
      phoneNumber: state.data.phoneNumber,
    },
  });

  const onSubmit = (data: StepTwoFormValues) => {
    actions.updateStepTwo(data);
    navigate(`/${ROUTES.MULTI}/${MULTI.STEP3}`);
  };

  const hasPhone = watch("hasPhoneNumber");

  return (
    <section>
      <h2 className="text-4xl text-center py-4">Step 2</h2>
      <form className="w-66" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Email"
          error={errors.email}
          formRegister={register("email")}
        />
        <FormFieldCheckbox
          label="Phone Number?"
          formRegister={register("hasPhoneNumber")}
        />
        {hasPhone && (
          <FormFieldPhoneNumber
            label="Phone Number"
            control={control}
            error={errors.phoneNumber}
            name="phoneNumber"
          />
        )}

        <section className="py-4 flex justify-end gap-2">
          <BackButton />
          <Button caption="Next" type="submit" />
        </section>
      </form>
    </section>
  );
}

export default Step2;
