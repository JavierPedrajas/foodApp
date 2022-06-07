export interface ITime {
  hours: number;
  minutes: number;
}

export interface ISchedule {
  id: string;
  name: string;
  time: ITime;
}

export interface ISchedulesDict {
  [key: string]: ISchedule;
}
