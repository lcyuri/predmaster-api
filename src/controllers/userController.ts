import express from 'express';
import { User, UserParams } from "../models/user.js";
import { getUserByUsernameAndPassword, addNewUser, deleteUser } from '../services/userService.js';


const router = express.Router();

router.get('/predmaster/api/user', async (req: any, res: any, next: any) => {
  try {
    const { username, password } = validateUserParamsForGet(req.query);
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
    const newUser = validateUserBodyForPost(req.body);
    const response = await addNewUser(newUser);
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
    const userId = validateParamsForDelete(req.query.id);
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
  if (err.message) {
    return res.status(400).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
});

export const validateUserParamsForGet = (userParams: UserParams): UserParams => {
  if (!userParams || Object.keys(userParams).length === 0) {
    throw new Error('Params are required');
  }

  if (!userParams.username) {
    throw new Error('Username is required');
  }
  
  if (!userParams.password) {
    throw new Error('Password is required');
  }

  return userParams;
};

export const validateUserBodyForPost = (userBody: User): User => {

  if (!userBody || Object.keys(userBody).length === 0) {
    throw new Error('Body is requried');
  }

  if (!userBody.username) {
    throw new Error('Username is requried');
  }

  if (!userBody.password) {
    throw new Error('Password is requried');
  }

  if (!userBody.email) {
    throw new Error('Email is requried');
  }

  if (!userBody.company) {
    throw new Error('Company is requried');
  }

  return userBody;
}

export const validateParamsForDelete = (userId: string): string => {
  if (!userId) {
    throw new Error('User id is required');
  }

  return userId;
}

export default router;