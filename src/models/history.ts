export interface History {
  id?: string;
  date: string;
  time: string;
  variableValue: string;
  FFT: string;
  valueNotUsed: string;
  alarmIndicator: string;
  machineName: string;
  sensorLocale: string;
  variableUnity: string;
  sensorType: string;
  clientId: string;
}

export interface HistoryParams {
  clientId: string;
}
