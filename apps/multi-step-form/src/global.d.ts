import "little-state-machine";
import { POSITION } from "./constants";

declare module "little-state-machine" {
  interface GlobalState {
    data: {
      firstName: string;
      lastName: string;
      bsn: string;
      dateOfBirth: Date | undefined;
      email: string;
      hasPhoneNumber: boolean;
      phoneNumber: string;
      files: FileList | undefined;
      position: (typeof POSITION)[number];
      skills: { value: (typeof SKILLS)[number] | "" }[];
    };
  }
}
