export interface ITime {
  hour: number;
  minutes: number;
}

export interface ISchedule {
  id: string;
  name: string;
  time: ITime;
}

export interface IScheduleDict {
  [key: string]: ISchedule;
}
