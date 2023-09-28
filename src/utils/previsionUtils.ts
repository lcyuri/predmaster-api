import { Prevision, PrevisionBody } from '../models/prevision.js';

export const handleClientId = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }
  return clientId;
}

export const handlePrevisionBody = (previsionBody: string): Prevision => {
  if (!previsionBody || previsionBody.length === 0) {
    throw new Error('Body is required');
  }

  let prevision: any = {};
  const values = previsionBody.split('_');
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

  return addClientIdToPrevision(prevision);
}

export const addClientIdToPrevision = (prevision: PrevisionBody): Prevision => {
  return({
    ...prevision,
    'clientId': process.env.CLIENT_ID
  });
}

export const handlePrevisionId = (previsionId: string): string => {
  if (!previsionId) {
    throw new Error('Prevision id is required');
  }
  return previsionId;
}