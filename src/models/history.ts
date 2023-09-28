import { SensorType, VariableType } from './types.js';

export interface History extends HistoryBody {
  id?: string;
  clientId: string;
}

export interface HistoryBody {
  date: string;
  time: string;
  variableValue: string;
  FFT: string;
  valueNotUsed: string;
  alarmIndicator: string | null;
  machineName: string;
  sensorLocale: string;
  variableType: VariableType;
  sensorType: SensorType;
}