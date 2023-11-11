import express from 'express';
import bodyParser from 'body-parser';
import { getAlarmByClient, addAlarm, deleteAlarm } from '../services/alarmService.js';
import { handleAlarmBody, handleAlarmId, handleClientId, handleAlarmColor } from '../utils/alarmUtils.js';

const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/alarm', async (req: any, res: any, next: any) => {
  try {
    const clientId = handleClientId(req.query.clientId);
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
    const clientId = handleClientId(req.query.clientId);
    const color = handleAlarmColor(req.query.color);
    const alarm = handleAlarmBody(clientId, color, req.body);
    const response = await addAlarm(alarm);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/alarm', async (req: any, res: any, next: any) => {
  try {
    const alarmId = handleAlarmId(req.query.id);
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

export default router;