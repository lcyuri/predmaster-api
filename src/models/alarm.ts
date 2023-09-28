import { AlarmColor, PredominantFactor } from './types.js';

export interface Alarm extends AlarmBody {
  id?: string;
  clientId: string;
}

export interface AlarmBody {
  date: string;
  time: string;
  sensorName: string;
  machineName: string;
  sensorLocale: string;
  predominantFactor: PredominantFactor;
  color: AlarmColor;
}