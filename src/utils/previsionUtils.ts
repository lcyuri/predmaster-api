import { Prevision } from '../models/prevision.js';
import { addMainProperties, getLineFromBody } from './genericUtils.js';

export const handlePrevisionBody = (clientId: string, body: any): Prevision => {
  let prevision: any = {};
  const line = getLineFromBody(body);
  const values = line.split('_');
  const properties = [
    'failurePredictability',
    'sensorName',
    'predominantFactor',
    'machineName',
    'sensorLocale'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      throw new Error(`Value at index ${i} is empty`);
    }

    prevision[properties[i]] = values[i];
  }

  return addMainProperties(clientId, prevision);
}