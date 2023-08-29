import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const ddbClient = new DynamoDBClient({ region: 'sa-east-1' });

export const getItem = async (itemId: string) => {
  const params = {
    TableName: 'main',
    Key: marshall({ id: itemId })
  };

  try {
    const data = await ddbClient.send(new GetItemCommand(params));
    return unmarshall(data.Item);
  } catch (error) {
    console.error('Error getting item from DynamoDB:', error);
  }
};

export const postItem = async (query: any) => {
  const params = {
    TableName: 'main',
    Item: marshall(query)
  };

  try {
    const response = await ddbClient.send(new PutItemCommand(params));
    return response;
  } catch (error) {
    console.error('Error posting item to DynamoDB: ', error);
  }
};

