export interface Settings {
  id?: string;
  sensorName: string;
  machineName: string;
  sensorLocale: string;
  variableUnity: string;
  yellowAlarmFFT: string;
  redAlarmFFT: string;
  yellowAlarmRMS: string;
  redAlarmRMS: string;
  clientId?: string;
}