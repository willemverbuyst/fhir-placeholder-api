import { ResourceType } from "./resourceType";

export interface Text {
  status: "generated";
  div?: string;
}

export interface Coding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
}

export interface Reference<T> {
  reference?: string;
  type?: T;
  identifier?: Identifier;
  display?: string;
}

export interface Identifier {
  use?: string;
  type?: any;
  system?: string;
  value?: string;
  period?: any;
  assigner?: Reference<"Organization">;
}

export interface ValueSet {
  resourceType: (typeof ResourceType)["ValueSet"];
  id: string;
  status: "active";
  meta?: any;
  text?: Text;
  url?: string;
  name?: string;
  publisher?: string;
  description?: string;
  immutable?: boolean;
  copyright?: string;
  compose?: any;
  request?: {
    method: string;
    url: string;
  };
}
