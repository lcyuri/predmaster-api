import express from 'express';
import bodyParser from 'body-parser';
import { getSettingsByClient, addNewSettings, deleteSettings } from '../services/settingsService.js';
import { Settings } from '../models/settings.js';


const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/settings', async (req: any, res: any, next: any) => {
  try {
    const clientId = validateSettingsParamsForGet(req.query.clientId);
    const response = await getSettingsByClient(clientId);
    if (!response || response.length === 0) {
      throw new Error('Settings not found');
    }
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/predmaster/api/settings', async (req: any, res: any, next: any) => {
  try {
    let newSettings = validateSettingsBodyForPost(req.body);
    newSettings = addClientIdToSettings(newSettings);
    const response = await addNewSettings(newSettings);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/settings', async (req: any, res: any, next: any) => {
  try {
    const settingsId = validateSettingsParamsForDelete(req.query.id);
    const response = await deleteSettings(settingsId);
    if (!response) {
      throw new Error('Settings not found');
    }
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.use((err: any, _req: any, res: any, _next: any) => {
  if (err.message) {
    return res.status(400).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
});

export const validateSettingsParamsForGet = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }

  return clientId;
};

export const validateSettingsBodyForPost = (body: string): Settings => {
  if (!body || body.length === 0) {
    throw new Error('Body is required');
  }

  let newSettings: any = {};
  const values = body.split('#');
  const properties = [
    'sensorName',
    'machineName',
    'sensorLocale',
    'variableUnity',
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

    newSettings[properties[i]] = values[i];
  }

  return newSettings;
}

export const addClientIdToSettings = (settings: Settings): Settings => {
  return ({
    ...settings,
    'clientId': process.env.CLIENT_ID
  });
}

export const validateSettingsParamsForDelete = (settingsId: string): string => {
  if (!settingsId) {
    throw new Error('Settings id is required');
  }

  return settingsId;
};


export default router;