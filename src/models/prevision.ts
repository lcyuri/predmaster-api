import { PredominantFactor } from './types.js';

export interface Prevision extends PrevisionBody {
  id?: string;
  clientId: string;
}

export interface PrevisionBody {
  failurePredictability: string;
  sensorName: string;
  predominantFactor: PredominantFactor;
  machineName: string;
  sensorLocale: string;
}
