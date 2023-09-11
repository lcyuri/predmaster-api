import { ObjectId } from 'mongodb';
import { getPrevisionCollection } from '../data/mongo.js';
import { Prevision } from '../models/prevision.js';


export const getAllPrevisions = async (): Promise<Prevision[] | null> => {
  try {
    const previsionCollection = getPrevisionCollection();
    const result = await previsionCollection.find().toArray();
    return result || null;
  } catch (error) {
    console.error('getAllPrevisions - ', error);
    throw new Error('Error getting all previsions for the user');
  }
}

export const getPrevisionById = async (id: string): Promise<Prevision | null> => {
  try {
    const previsionCollection = getPrevisionCollection();
    const objectIdPrevisionId = new ObjectId(id);
    const result = await previsionCollection.findOne({ _id: objectIdPrevisionId });
    return result || null;
  } catch (error) {
    console.error('getPrevisionById - ', error);
    throw new Error('Error getting prevision');
  }
}

export const addNewPrevision = async (newPrevision: Prevision): Promise<ObjectId> => {
  try {
    const previsionCollection = getPrevisionCollection();
    const result = await previsionCollection.insertOne(newPrevision);
    return result.insertedId;
  } catch (error) {
    console.error('addNewPrevision - ', error);
    throw new Error('Error adding a new prevision');
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
