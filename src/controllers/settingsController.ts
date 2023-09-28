import express from 'express';
import bodyParser from 'body-parser';
import { handleClietId, handleSettingsBody, handleSettingsId } from '../utils/settingsUtils.js';
import { getSettingsByClient, addSettings, deleteSettings } from '../services/settingsService.js';

const router = express.Router();
router.use(bodyParser.text())

router.get('/predmaster/api/settings', async (req: any, res: any, next: any) => {
  try {
    const clientId = handleClietId(req.query.clientId);
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
    const settings = handleSettingsBody(req.body);
    const response = await addSettings(settings);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/settings', async (req: any, res: any, next: any) => {
  try {
    const settingsId = handleSettingsId(req.query.id);
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

export default router;