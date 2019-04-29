'use strict';

module.exports.hello = async (event, context, callback) => {
  console.log(`Successfully received ${event.Records.length} records.`);
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function executed successfully!',
  //     input: event,
  //   }, null, 2),
  // };
  
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  //console.log('Received event:', JSON.stringify(event, null, 2));
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));
    console.log(record.eventName);
    console.log(record.eventID);
    if ('INSERT' == record.eventName) {
      console.log('INSERT: DynamoDB NEW Record: %j', record.dynamodb.NewImage);
    } else if ('MODIFY' == record.eventName) {
      console.log('UPDATE: DynamoDB OLD Record: %j', record.dynamodb.OldImage);
      console.log('UPDATE: DynamoDB NEW Record: %j', record.dynamodb.NewImage);
    } else if ('REMOVE' == record.eventName) {
      console.log('DELETE: DynamoDB OLD Record: %j', record.dynamodb.OldImage);
    }
  });

  callback(null, `Successfully processed ${event.Records.length} records.`);
};
