import { ObjectId } from 'mongodb';
import { getUsersCollection } from '../data/mongo.js';
import { User } from '../models/user.js';

export const getUserByUsernameAndPassword = async (username: string, password: string): Promise<User | null> => {
  try {
    const usersCollection = getUsersCollection();
    const result = await usersCollection.findOne({ username, password });

    return result || null;
  } catch (error) {
    console.error('getUserByUsernameAndPassword - ', error);
    throw new Error('Error getting user by username and password');
  }
}

export const addUser = async (user: User): Promise<ObjectId | null> => {
  try {
    const usersCollection = getUsersCollection();
    const username = user.username;
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return null;
    } else {
      const result = await usersCollection.insertOne(user);
      return result.insertedId;
    }
  } catch (error) {
    console.error('addUser - ', error);
    throw new Error('Error adding user');
  }
}

export const deleteUser = async (userId: string): Promise<ObjectId | null> => {
  try {
    const usersCollection = getUsersCollection();
    const objectIdUserId = new ObjectId(userId);
    const result = await usersCollection.deleteOne({ _id: objectIdUserId });

    return result.deletedCount === 1 ? objectIdUserId : null;
  } catch (error) {
    console.error('deleteUser - ', error);
    throw new Error('Error deleting user');
  }
}
