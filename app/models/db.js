const dynamoose = require("dynamoose");

const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.DYNAMODB_ENDPOINT, 
});

dynamoose.aws.ddb.set(ddb);

module.exports = dynamoose;
