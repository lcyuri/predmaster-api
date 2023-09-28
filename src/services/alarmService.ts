import { ObjectId } from 'mongodb';
import { getAlarmCollection } from '../data/mongo.js';
import { Alarm } from '../models/alarm.js';

export const getAlarmByClient = async (clientId: string): Promise<Alarm[] | null> => {
  try {
    const alarmCollection = getAlarmCollection();
    const result = await alarmCollection.find({ clientId }).toArray();

    return result || null;
  } catch (error) {
    console.error('getAlarmByClient - ', error);
    throw new Error('Error getting alarm by client');
  }
}

export const addAlarm = async (alarm: any): Promise<ObjectId> => {
  try {
    const alarmCollection = getAlarmCollection();
    const result = await alarmCollection.insertOne(alarm);

    return result.insertedId;
  } catch (error) {
    console.error('addAlarm - ', error);
    throw new Error('Error adding alarm');
  }
}

export const deleteAlarm = async (alarmId: string): Promise<ObjectId | null> => {
  try {
    const alarmCollection = getAlarmCollection();
    const objectId = new ObjectId(alarmId);
    const result = await alarmCollection.deleteOne({ _id: objectId });

    return result.deletedCount === 1 ? objectId : null;
  } catch (error) {
    console.error('deleteAlarm - ', error);
    throw new Error('Error deleting alarm');
  }
}
