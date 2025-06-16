import { zodResolver } from "@hookform/resolvers/zod";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import FormFieldDropzone from "../../components/FormFieldDropzone";
import { MULTI, ROUTES } from "../../constants";
import { updateStepThree } from "../../state/actions";

const stepThreeFormValues = z.object({
  files: z.instanceof(FileList).optional(),
});

type StepThreeFormValues = z.infer<typeof stepThreeFormValues>;

function Step3() {
  const { actions, state } = useStateMachine({ updateStepThree });
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<StepThreeFormValues>({
    resolver: zodResolver(stepThreeFormValues),
    defaultValues: { files: undefined },
  });

  const onSubmit = (data: StepThreeFormValues) => {
    actions.updateStepThree({ files: data.files });

    navigate(`/${ROUTES.MULTI}/${MULTI.STEP4}`);
  };

  return (
    <section>
      <h2 className="text-4xl text-center py-4">Step 3</h2>
      <form className="w-66" onSubmit={handleSubmit(onSubmit)}>
        <FormFieldDropzone name="files" multiple control={control} />
        <section className="flex justify-between gap-8 py-2">
          {state.data.files && (
            <ul>
              {Object.values(state.data.files || {}).map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </section>
        <section className="py-4 flex justify-end gap-2">
          <BackButton />
          <Button caption="Next" type="submit" />
        </section>
      </form>
    </section>
  );
}

export default Step3;
