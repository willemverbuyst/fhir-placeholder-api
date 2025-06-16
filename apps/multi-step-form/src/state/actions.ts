import { GlobalState } from "little-state-machine";
import { POSITION, SKILLS } from "../constants";

export function updateStepOne(
  state: GlobalState,
  payload: {
    firstName: string;
    lastName: string;
  }
) {
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
}

export function updateStepTwo(
  state: GlobalState,
  payload: {
    email: string;
    hasPhoneNumber: boolean;
    phoneNumber: string;
  }
) {
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
}

export function updateStepThree(
  state: GlobalState,
  payload: {
    files: FileList | undefined;
  }
) {
  if (!payload.files) {
    return state;
  }
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
}

export function updateStepFour(
  state: GlobalState,
  payload: {
    position: (typeof POSITION)[number];
    skills: { value: (typeof SKILLS)[number] | "" }[];
  }
) {
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
}

export function resetStore() {
  return {
    data: {
      firstName: "",
      lastName: "",
      bsn: "",
      dateOfBirth: undefined,
      email: "",
      hasPhoneNumber: false,
      phoneNumber: "",
      files: undefined,
      position: POSITION[0],
      skills: [{ value: "" }],
    },
  };
}
