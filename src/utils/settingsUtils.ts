import { Settings } from '../models/settings.js';
import { addMainProperties, getLineFromBody } from './genericUtils.js';

export const handleSettingsBody = (clientId: string, body: string): Settings => {
  let settings: any = {};
  const line = getLineFromBody(body);
  const values = line.split('#');
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

  // Using lenght manually since the txt has more spaces for future implementations
  for (let i = 0; i < 8; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      throw new Error(`Value at index ${i} is empty`);
    }

    settings[properties[i]] = values[i];
  }

  return addMainProperties(clientId, settings);
}