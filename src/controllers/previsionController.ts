import express from 'express';
import bodyParser from 'body-parser';
import { handleClientId, handlePrevisionBody, handlePrevisionId } from '../utils/previsionUtils.js';
import { getPrevisionByClient, addPrevision, deletePrevision } from '../services/previsionService.js';

const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    const clientId = handleClientId(req.query.id);
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
    const clientId = handleClientId(req.query.id);
    const newPrevision = handlePrevisionBody(clientId, req.body);
    const response = await addPrevision(newPrevision);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    const previsionId = handlePrevisionId(req.query.id);
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
  if (err.message) {
    return res.status(400).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
});

export default router;