import AWS from 'aws-sdk';

// Log environment variables to ensure they are loaded
console.log('AWS Access Key:', process.env.REACT_APP_AWS_ACCESS_KEY_ID);
console.log('AWS Secret Key:', process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default dynamoDb;
