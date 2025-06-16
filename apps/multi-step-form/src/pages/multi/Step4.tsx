import { zodResolver } from "@hookform/resolvers/zod";
import { useStateMachine } from "little-state-machine";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import FormFieldRadioGroup from "../../components/FormFieldRadioGroup";
import FormFieldSelect from "../../components/FormFieldSelect";
import { MULTI, POSITION, ROUTES, SKILLS } from "../../constants";
import { updateStepFour } from "../../state/actions";

const stepFourFormValues = z.object({
  position: z.enum(POSITION),
  skills: z.array(z.object({ value: z.enum([...SKILLS, ""]) })),
});

type StepFourFormValues = z.infer<typeof stepFourFormValues>;

function Step4() {
  const { actions, state } = useStateMachine({ updateStepFour });
  const navigate = useNavigate();
  const { handleSubmit, register, control } = useForm<StepFourFormValues>({
    resolver: zodResolver(stepFourFormValues),
    defaultValues: {
      position: state.data.position,
      skills: state.data.skills,
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const onSubmit = (data: StepFourFormValues) => {
    actions.updateStepFour(data);
    navigate(`/${ROUTES.MULTI}/${MULTI.RESULT}`);
  };

  const appendSkill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    append({ value: "" });
  };

  const removeSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => {
    e.preventDefault();
    remove(i);
  };

  return (
    <section>
      <h2 className="text-4xl text-center py-4">Step 4</h2>
      <form className="w-66" onSubmit={handleSubmit(onSubmit)}>
        <FormFieldRadioGroup
          legend="Position?"
          formRegister={register("position")}
          values={[...POSITION]}
        />
        <section className="flex flex-col py-1">
          <label className="text-2xl">Skills</label>
          {fields.map((_, i) => (
            <section key={i} className="flex justify-between gap-1">
              <FormFieldSelect
                formRegister={register(`skills.${i}.value`)}
                options={SKILLS.map((i) => ({ value: i }))}
              />
              {i > 0 && (
                <button
                  className="text-slate-300 px-2 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                  onClick={(e) => removeSkill(e, i)}
                >
                  -
                </button>
              )}
              <button
                onClick={appendSkill}
                className="text-slate-300 px-2 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
              >
                +
              </button>
            </section>
          ))}
        </section>
        <section className="py-4 flex justify-end gap-2">
          <BackButton />
          <Button caption="Next" type="submit" />
        </section>
      </form>
    </section>
  );
}

export default Step4;
