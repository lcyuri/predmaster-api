import { Alarm, AlarmBody } from '../models/alarm.js';

export const handleClientId = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }

  return clientId;
};

export const handleAlarmBody = (alarmBody: string): Alarm => {
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
    'predominantFactor',
    'alarmColor'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      throw new Error(`Value at index ${i} is empty`);
    }

    alarm[properties[i]] = values[i];
  }

  return addClientIdToAlarm(alarm);
}

export const addClientIdToAlarm = (alarm: AlarmBody): Alarm => {
  return ({
    ...alarm,
    'clientId': process.env.CLIENT_ID
  });
}

export const handleAlarmId = (alarmId: string): string => {
  if (!alarmId) {
    throw new Error('Alarm id is required');
  }

  return alarmId;
};