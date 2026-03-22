import { Context } from ".";

export const onInitializeOvermind = async ({
  actions,
  state,
  effects,
}: Context) => {
  state.isLoading = true;
  state.questionnaire = await effects.api.getQuestionnaire();
  state.countries = await actions.getCountryNames();
  state.isLoading = false;
};

export const getCountryNames = async ({
  effects,
}: Context): Promise<string[]> => {
  const countries = (await effects.api.getCountries()) || [];

  return countries.map((country) => country.name);
};
