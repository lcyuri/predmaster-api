export const handleClientId = (clientId: string): string => {
  if (!clientId) {
    throw new Error('Client id is required');
  }
  return clientId;
}

export const getLineFromBody = (body: any): string => {
  if (body?.line?.length === 0) {
    throw new Error('Line is required');
  }
  return body.lines;
}

export const addMainProperties = (clientId: string, item: any): any => {
  return ({
    ...item,
    clientId,
    creationDate: new Date().toISOString()
  });
}

export const handleId = (id: string): string => {
  if (!id) {
    throw new Error('Id is required');
  }
  return id;
}