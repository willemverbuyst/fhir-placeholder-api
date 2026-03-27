import axios from "axios";

import { Country, Questionnaire } from "./interfaces";

const BACKEND_URL = "http://localhost:8085";

export const api = {
  getQuestionnaire: async (): Promise<Questionnaire> => {
    const response = await axios.get(`${BACKEND_URL}/questionnaire`);

    return response.data;
  },

  getCountries: async (): Promise<Country[]> => {
    const response = await axios.get(`${BACKEND_URL}/countries`);

    return response.data;
  },
};
