import { DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
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

export const updateItem = async (itemId: string, newItem: any) => {
  const marshalledData = marshall(newItem);

  const updatedAttributes = Object.keys(newItem);

  const updateExpression = updatedAttributes.reduce((expression, attribute, index) => {
    const attributeName = `#attr${index + 1}`;
    const attributeValue = `:val${index + 1}`;
    expression += `${index === 0 ? 'SET' : ''} ${attributeName} = ${attributeValue}${index === updatedAttributes.length - 1 ? '' : ','}`;
    return expression;
  }, '');

  const attributeNames = updatedAttributes.reduce((names, attribute, index) => {
    names[`#attr${index + 1}`] = attribute;
    return names;
  }, {});

  const attributeValues = updatedAttributes.reduce((values, attribute, index) => {
    values[`:val${index + 1}`] = marshalledData[attribute];
    return values;
  }, {});

  const params = {
    TableName: 'main',
    Key: marshall({ id: itemId }),
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues
  };

  try {
    const response = await ddbClient.send(new UpdateItemCommand(params));
    return response;
  } catch (error) {
    console.error('Error updating item in DynamoDB:', error);
  }
};

export const deleteItem = async (itemId: string) => {
  const params = {
    TableName: 'main',
    Key: marshall({ id: itemId })
  };

  try {
    const response = await ddbClient.send(new DeleteItemCommand(params));
    return response;
  } catch (error) {
    console.error('Error deleting item from DynamoDB:', error);
  }
};