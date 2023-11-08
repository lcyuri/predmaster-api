import { History } from '../models/history.js';

export const handleClientId = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }

  return clientId;
};

export const handleHistoryBody = (clientId: string, historyBody: string): History => {
  if (!historyBody || historyBody.length === 0) {
    throw new Error('Body is required');
  }

  let history: any = {};
  const values = historyBody.split('_');
  const properties = [
    'date',
    'time',
    'variableValue',
    'FFT',
    'valueNotUsed',
    'alarmIndicator',
    'machineName',
    'sensorLocale',
    'variableType',
    'sensorType'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      if (properties[i] === 'alarmIndicator') {
        history['alarmIndicator'] = null;
      } else {
        throw new Error(`Value at index ${i} is empty`);
      }
    } else {
      history[properties[i]] = values[i];
    }
  }

  return ({
    ...history,
    'clientId': clientId
  });
}

export const handleHistoryId = (historyId: string): string => {
  if (!historyId) {
    throw new Error('History id is required');
  }

  return historyId;
}