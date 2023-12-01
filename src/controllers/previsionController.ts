import express from 'express';
import bodyParser from 'body-parser';
import { getPrevisionByClient, deletePrevision, addPrevision } from '../services/previsionService.js';
import { handleClientId, handleId } from '../utils/genericUtils.js';
import { handlePrevisionBody } from '../utils/previsionUtils.js';

const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    const clientId = handleClientId(req.query.clientId);
    const response = await getPrevisionByClient(clientId);
    if(!response) {
      throw new Error('Prevision not found');
    }
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    const clientId = handleClientId(req.query.clientId);
    const prevision = handlePrevisionBody(clientId, req.body);
    const response = await addPrevision(prevision);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    const previsionId = handleId(req.query.id);
    const response = await deletePrevision(previsionId);
    if (!response) {
      throw new Error('Prevision not found');
    }
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.use((err: any, _req: any, res: any, _next: any) => {
  if (err.message === 'Prevision not found') {
    return res.status(404).send(err.message);
  } else if (err.message) {
    return res.status(400).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
});

export default router;