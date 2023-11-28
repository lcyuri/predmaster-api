import express from 'express';
import { handleUserBody, handleUserCredentials, handleUserId } from '../utils/userUtils.js';
import { getUserByUsernameAndPassword, addUser, deleteUser } from '../services/userService.js';

const router = express.Router();

router.get('/predmaster/api/user', async (req: any, res: any, next: any) => {
  try {
    const { username, password } = handleUserCredentials(req.query);
    const response = await getUserByUsernameAndPassword(username, password);

    if (!response) {
      throw new Error('User not found');
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post('/predmaster/api/user', async (req: any, res: any, next: any) => {
  try {
    const user = handleUserBody(req.body);
    const response = await addUser(user);

    if (!response) {
      throw new Error('User already exists');
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/predmaster/api/user', async (req: any, res: any, next: any) => {
  try {
    const userId = handleUserId(req.query.id);
    const response = await deleteUser(userId);

    if (!response) {
      throw new Error('User not found');
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.use((err: any, _req: any, res: any, _next: any) => {
  if (err.message === 'User not found') {
    return res.status(404).send(err.message);
  } else if (err.message) {
    return res.status(400).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
});

export default router;