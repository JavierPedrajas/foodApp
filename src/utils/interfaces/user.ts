import { LangType } from "Context/LangContext";

export interface IUser {
  uid: string;
  email: string;
  config: IConfig;
}

export interface IConfig {
  language: LangType;
  // weekStart: number // TB Implemented
}
