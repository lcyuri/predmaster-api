import { UserCredentials, User, UserBody } from '../models/user.js';

export const handleUserCredentials = (userCredentials: UserCredentials): UserCredentials => {
  if (!userCredentials.username) {
    throw new Error('Username is required');
  }

  if (!userCredentials.password) {
    throw new Error('Password is required');
  }

  return userCredentials;
};

export const handleUserBody = (userBody: UserBody): User => {
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

  return addClientIdToUser(userBody);
}

export const addClientIdToUser = (user: UserBody): User => {
  return ({
    ...user,
    'clientId': process.env.CLIENT_ID
  });
}

export const handleUserId = (userId: string): string => {
  if (!userId) {
    throw new Error('User id is required');
  }

  return userId;
}
