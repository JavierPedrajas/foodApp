import { IMeal } from ".";

export interface IUser {
    name:string
    email:string
    config: IConfig
}

export interface IConfig{
    meals: IMeal[]
    // language:string // TB Implemented
    // weekStart: number // TB Implemented
}