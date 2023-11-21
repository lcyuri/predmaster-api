import { Alarm } from '../models/alarm.js';
import { addMainProperties, getLineFromBody } from './genericUtils.js';

export const handleAlarmColor = (color: string): string => {
  if (!color) {
    throw new Error('Alarm color is required');
  }

  return color;
}

export const handleAlarmBody = (clientId: string, color: string, body: string): Alarm => {
  let alarm: any = {};
  const line = getLineFromBody(body);
  const values = line.split('_');
  const properties = [
    'date',
    'time',
    'sensorName',
    'machineName',
    'sensorLocale',
    'predominantFactor'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      throw new Error(`Value at index ${i} is empty`);
    }

    alarm[properties[i]] = values[i];
  }

  alarm = { ...alarm, color };

  return addMainProperties(clientId, alarm);
}