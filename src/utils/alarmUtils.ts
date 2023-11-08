import { Alarm } from '../models/alarm.js';

export const handleClientId = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }

  return clientId;
};

export const handleAlarmColor = (alarmType: string): string => {
  if (!alarmType) {
    throw new Error('Alarm type is required');
  }

  return alarmType;
}

export const handleAlarmBody = (clientId: string, color: string, alarmBody: string): Alarm => {
  if (!alarmBody || alarmBody.length === 0) {
    throw new Error('Body is required');
  }

  let alarm: any = {};
  const values = alarmBody.split('_');
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

  return ({
    ...alarm,
    'clientId': clientId,
    'color': color
  });
}

export const handleAlarmId = (alarmId: string): string => {
  if (!alarmId) {
    throw new Error('Alarm id is required');
  }

  return alarmId;
};