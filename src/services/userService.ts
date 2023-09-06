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

export const addNewUser = async (newUser: User): Promise<ObjectId | null> => {
  try {
    const usersCollection = getUsersCollection();
    const username = newUser.username;
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return null;
    } else {
      const result = await usersCollection.insertOne(newUser);
      return result.insertedId;
    }
  } catch (error) {
    console.error('addNewUser - ', error);
    throw new Error('Error adding a new user');
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
