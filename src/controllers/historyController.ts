import express from 'express';
import { History, HistoryParams } from '../models/history.js';
import bodyParser from 'body-parser';
import { getHistoryByClient, addNewHistory, deleteHistory } from '../services/historyService.js';


const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/history', async (req: any, res: any, next: any) => {
  try {
    const clientId = validateHistoryParamsForGet(req.query);
    const response = await getHistoryByClient(clientId);
    if(!response || response.length === 0) {
      throw new Error('History not found');
    }
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/predmaster/api/history', async (req: any, res: any, next: any) => {
  try {
    let newHistory = validateHistoryBodyForPost(req.body);
    newHistory = addClientIdToHistory(newHistory);
    const response = await addNewHistory(newHistory);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/history', async (req: any, res: any, next: any) => {
  try {
    const historyId = validateHistoryParamsForDelete(req.query.id);
    const response = await deleteHistory(historyId);
    if (!response) {
      throw new Error('History not found');
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

export const validateHistoryParamsForGet = (historyParams: HistoryParams): string => {
  if (!historyParams || Object.keys(historyParams).length === 0) {
    throw new Error('Params are required');
  }

  if (!historyParams.clientId) {
    throw new Error('Client id is required');
  }

  return historyParams.clientId;
};

export const validateHistoryBodyForPost = (body: string): History => {
  if (!body || body.length === 0) {
    throw new Error('Body is required');
  }

  let newHistory: any = {};
  const values = body.split('_');
  const properties = [
    'date',
    'time',
    'variableValue',
    'FFT',
    'valueNotUsed',
    'alarmIndicator',
    'machineName',
    'sensorLocale',
    'variableUnity',
    'sensorType'
  ];

  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].trim();

    if ((!values[i] || values[i].length === 0)) {
      if (properties[i] === 'alarmIndicator') {
        newHistory['alarmIndicator'] = null;
      } else {
        throw new Error(`Value at index ${i} is empty`);
      }
    } else {
      newHistory[properties[i]] = values[i];
    }
  }

  return newHistory;
}

export const addClientIdToHistory = (history: History): History => {
  return ({
    ...history,
    'clientId': process.env.CLIENT_ID
  });
}

export const validateHistoryParamsForDelete = (historyId: string): string => {
  if (!historyId) {
    throw new Error('History id is required');
  }

  return historyId;
}

export default router;