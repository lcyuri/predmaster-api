import { VariableType } from './types.js';

export interface Settings extends SettingsBody {
  id?: string;
  clientId: string;
}

export interface SettingsBody {
  sensorName: string;
  machineName: string;
  sensorLocale: string;
  variableType: VariableType;
  yellowAlarmFFT: string;
  redAlarmFFT: string;
  yellowAlarmRMS: string;
  redAlarmRMS: string;
}