import express from 'express';
import bodyParser from 'body-parser';
import { handleClientId, handleHistoryBody, handleHistoryId } from '../utils/historyUtils.js';
import { getHistoryByClient, addHistory, deleteHistory } from '../services/historyService.js';

const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/history', async (req: any, res: any, next: any) => {
  try {
    const clientId = handleClientId(req.query.id);
    const response = await getHistoryByClient(clientId);

    if(!response) {
      throw new Error('History not found');
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/predmaster/api/history', async (req: any, res: any, next: any) => {
  try {
    const history = handleHistoryBody(req.body);
    const response = await addHistory(history);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/history', async (req: any, res: any, next: any) => {
  try {
    const historyId = handleHistoryId(req.query.id);
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

export default router;