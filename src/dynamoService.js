import dynamoDb from './awsConfig';

// Function to add an item to DynamoDB
export const addItem = async (item) => {
  const params = {
    TableName: 'ItemsTable', // Replace with your table name
    Item: {
      ID: item.id, // Use 'ID' with exact capitalization as in the table schema
      name: item.name,
      description: item.description,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Item added:', item);
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Function to fetch all items from DynamoDB
export const fetchItems = async () => {
  const params = {
    TableName: 'ItemsTable',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    console.log('Fetched items:', data.Items);
    return data.Items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
