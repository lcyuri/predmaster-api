import { ObjectId } from 'mongodb';
import { getPrevisionCollection } from '../data/mongo.js';
import { Prevision } from '../models/prevision.js';


export const getPrevisionByClient = async (clientId: string): Promise<Prevision[] | null> => {
  try {
    const previsionCollection = getPrevisionCollection();
    const result = await previsionCollection.find({ clientId }).toArray();
    return result || null;
  } catch (error) {
    console.error('getPrevisionByClient - ', error);
    throw new Error('Error getting prevision by client');
  }
}

export const addPrevision = async (prevision: Prevision): Promise<ObjectId> => {
  try {
    const previsionCollection = getPrevisionCollection();
    const result = await previsionCollection.insertOne(prevision);
    return result.insertedId;
  } catch (error) {
    console.error('addPrevision - ', error);
    throw new Error('Error adding prevision');
  }
}

export const deletePrevision = async (previsionId: string): Promise<ObjectId | null> => {
  try {
    const previsionCollection = getPrevisionCollection();
    const objectIdPrevisionId = new ObjectId(previsionId);
    const result = await previsionCollection.deleteOne({ _id: objectIdPrevisionId });
    return result.deletedCount === 1 ? objectIdPrevisionId : null;
  } catch (error) {
    console.error('deletePrevision - ', error);
    throw new Error('Error deleting prevision');
  }
}
