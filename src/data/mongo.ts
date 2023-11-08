import { MongoClient, Db, Collection } from 'mongodb';
import { User } from '../models/user.js';
import { Prevision } from '../models/prevision.js';
import { History } from '../models/history.js';
import { Settings } from '../models/settings.js';
import { Alarm } from '../models/alarm.js';

let client: MongoClient | null = null;

export const connect = async (): Promise<void> => {
  try {
    const dbUrl = process.env.MONGO_URI;
    client = new MongoClient(dbUrl);
    await client.connect();
  } catch (error) {
    console.error('connect - ', error);
    throw new Error('Error connecting to database');
  }
}

export const close = async (): Promise<void> => {
  try {
    await client.close();
    client = null;
  } catch (error) {
    console.error('close - ', error);
    throw new Error('Error closing database');
  }
}

export const getDatabase = (): Db => {
  try {
    return client.db('predmaster-db');
  } catch (error) {
    console.error('getDatabase - ', error);
    throw new Error('Error getting database');
  }
}

export const getUsersCollection = (): Collection<User> => {
  try {
    const db = getDatabase();
    return db?.collection<User>('user');
  } catch (error) {
    console.error('getUsersCollection - ', error);
    throw new Error('Error getting users collection');
  }
}

export const getPrevisionCollection = (): Collection<Prevision> => {
  try {
    const db = getDatabase();
    return db?.collection<Prevision>('prevision');
  } catch (error) {
    console.error('getPrevisionsCollection - ', error);
    throw new Error('Error getting previsions collection');
  }
}

export const getHistoryCollection = (): Collection<History> => {
  try {
    const db = getDatabase();
    return db?.collection<History>('history');
  } catch (error) {
    console.error('getHistoryCollection - ', error);
    throw new Error('Error getting history collection');
  }
}

export const getSettingsCollection = (): Collection<Settings> => {
  try {
    const db = getDatabase();
    return db?.collection<Settings>('settings');
  } catch (error) {
    console.error('getSettingsCollection - ', error);
    throw new Error('Error getting settings collection');
  }
}

export const getAlarmCollection = (): Collection<Alarm> => {
  try {
    const db = getDatabase();
    return db?.collection<Alarm>('alarm');
  } catch (error) {
    console.error('getAlarmCollection - ', error);
    throw new Error('Error getting alarm collection');
  }
}