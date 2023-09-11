import express from 'express';
import { addNewPrevision, deletePrevision, getAllPrevisions, getPrevisionById } from '../services/previsionService.js';
import { Prevision } from '../models/prevision.js';
import bodyParser from 'body-parser';


const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    let response: any;
    if (req.query.id) {
      response = await getPrevisionById(req.query.id);
    } else {
      response = await getAllPrevisions();
    }
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
    const newPrevision = validatePrevisionBodyForPost(req.body);
    const response = await addNewPrevision(newPrevision);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/prevision', async (req: any, res: any, next: any) => {
  try {
    const previsionId = validatePrevisionParamsForDelete(req.query.id);
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

export const validatePrevisionBodyForPost = (previsionBody: string): Prevision => {
  if (!previsionBody || previsionBody.length === 0) {
    throw new Error('Body is required');
  }

  const splitedBody = previsionBody.split('_');
  const properties = [ 'predictability', 'sensor', 'predominantFactor', 'machine', 'locale' ];
  let newPrevision: any = {};

  for (let i = 0; i < splitedBody.length; i++) {
    splitedBody[i] = splitedBody[i].trim();
    newPrevision[properties[i]] = splitedBody[i];
  }

  return newPrevision;
}

export const validatePrevisionParamsForDelete = (previsionId: string): string => {
  if (!previsionId) {
    throw new Error('Prevision id is required');
  }

  return previsionId;
}

export default router;