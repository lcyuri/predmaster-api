import { ObjectId } from 'mongodb';
import { getHistoryCollection } from '../data/mongo.js';
import { History } from '../models/history.js';

export const getHistoryByClient = async (clientId: string): Promise<any[] | null> => {
  try {
    const historyCollection = getHistoryCollection();
    const result = await historyCollection.find({ clientId }).toArray();

    return result || null;
  } catch (error) {
    console.error('getHistoryByClient - ', error);
    throw new Error('Error getting history by client');
  }
}

export const addHistory = async (history: History): Promise<ObjectId> => {
  try {
    const historyCollection = getHistoryCollection();
    const result = await historyCollection.insertOne(history);

    return result.insertedId;
  } catch (error) {
    console.error('addHistory - ', error);
    throw new Error('Error adding history');
  }
}

export const deleteHistory = async (historyId: string): Promise<ObjectId | null> => {
  try {
    const historyCollection = getHistoryCollection();
    const objectId = new ObjectId(historyId);
    const result = await historyCollection.deleteOne({ _id: objectId });

    return result.deletedCount === 1 ? objectId : null;
  } catch (error) {
    console.error('deleteHistory - ', error);
    throw new Error('Error deleting history');
  }
}


