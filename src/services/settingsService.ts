import { ObjectId } from 'mongodb';
import { getSettingsCollection } from '../data/mongo.js';
import { Settings } from '../models/settings.js';

export const getSettingsByClient = async (clientId: string): Promise<Settings[] | null> => {
  try {
    const settingsCollection = getSettingsCollection();
    const result = await settingsCollection.find({ clientId }).toArray();
    return result || null;
  } catch (error) {
    console.error('getSettingsByClient - ', error);
    throw new Error('Error getting settings for the client');
  }
}

export const addNewSettings = async (newSettings: any): Promise<ObjectId> => {
  try {
    const settingsCollection = getSettingsCollection();
    const result = await settingsCollection.insertOne(newSettings);
    return result.insertedId;
  } catch (error) {
    console.error('addNewSettings - ', error);
    throw new Error('Error adding new settings');
  }
}

export const deleteSettings = async (settingsId: string): Promise<ObjectId | null> => {
  try {
    const settingsCollection = getSettingsCollection();
    const objectId = new ObjectId(settingsId);
    const result = await settingsCollection.deleteOne({ _id: objectId });
    return result.deletedCount === 1 ? objectId : null;
  } catch (error) {
    console.error('deleteSettings - ', error);
    throw new Error('Error deleting settings');
  }
}
