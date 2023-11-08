import { Settings } from '../models/settings.js';

export const handleClietId = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }

  return clientId;
};

export const handleSettingsBody = (clientId: string, settingsBody: string): Settings => {
  if (!settingsBody || settingsBody.length === 0) {
    throw new Error('Body is required');
  }

  let settings: any = {};
  const values = settingsBody.split('#');
  const properties = [
    'sensorName',
    'machineName',
    'sensorLocale',
    'variableType',
    'yellowAlarmFFT',
    'redAlarmFFT',
    'yellowAlarmRMS',
    'redAlarmRMS'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      throw new Error(`Value at index ${i} is empty`);
    }

    settings[properties[i]] = values[i];
  }

  return ({
    ...settings,
    'clientId': clientId
  });
}

export const handleSettingsId = (settingsId: string): string => {
  if (!settingsId) {
    throw new Error('Settings id is required');
  }

  return settingsId;
};