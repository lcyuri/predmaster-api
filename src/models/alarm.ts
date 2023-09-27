export interface Alarm {
  id?: string;
  date: string;
  time: string;
  sensorName: string;
  machineName: string;
  sensorLocale: string;
  predominantFactor: string;
  color: string;
  clientId?: string;
}