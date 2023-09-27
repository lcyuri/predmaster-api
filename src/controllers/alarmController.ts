import express from 'express';
import bodyParser from 'body-parser';
import { getAlarmByClient, addNewAlarm, deleteAlarm } from '../services/alarmService.js';
import { Alarm } from '../models/alarm.js';


const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/alarm', async (req: any, res: any, next: any) => {
  try {
    const clientId = validateAlarmParamsForGet(req.query.clientId);
    const response = await getAlarmByClient(clientId);
    if (!response || response.length === 0) {
      throw new Error('Alarm not found');
    }
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/predmaster/api/alarm', async (req: any, res: any, next: any) => {
  try {
    let newAlarm = validateAlarmBodyForPost(req.body);
    newAlarm = addClientIdToAlarm(newAlarm);
    const response = await addNewAlarm(newAlarm);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/alarm', async (req: any, res: any, next: any) => {
  try {
    const alarmId = validateAlarmParamsForDelete(req.query.id);
    const response = await deleteAlarm(alarmId);
    if (!response) {
      throw new Error('Alarm not found');
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

export const validateAlarmParamsForGet = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }

  return clientId;
};

export const validateAlarmBodyForPost = (body: string): Alarm => {
  if (!body || body.length === 0) {
    throw new Error('Body is required');
  }

  let newAlarm: any = {};
  const values = body.split('_');
  const properties = [
    'date',
    'time',
    'sensorName',
    'machineName',
    'sensorLocale',
    'predominantFactor',
    'color'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      throw new Error(`Value at index ${i} is empty`);
    }

    newAlarm[properties[i]] = values[i];
  }

  return newAlarm;
}

export const addClientIdToAlarm = (alarm: Alarm): Alarm => {
  return ({
    ...alarm,
    'clientId': process.env.CLIENT_ID
  });
}

export const validateAlarmParamsForDelete = (alarmId: string): string => {
  if (!alarmId) {
    throw new Error('Alarm id is required');
  }

  return alarmId;
};


export default router;