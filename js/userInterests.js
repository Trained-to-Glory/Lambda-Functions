'use strict';

const AWS = require('aws-sdk');
var config = {
  "apiVersion": "2017-06-09",
  "accessKeyId": "AKIAJO42PSYJK7UIMUMA",
  "secretAccessKey": "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",
  "region":"us-east-1",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);
const uuid = require('uuid');

//Create functions
exports.handler.selectInterests = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'userInterests',
    Item: { // a map of attribute name to AttributeValue
        "userId": event.userId,
        "interests": event.interests
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Read Functions
exports.handler.getUserInterests = function(event, context) {
  var params = {
    TableName: 'userInterests',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
          "userId": event.userId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Update Functions
exports.handler.changeSelected = function(event, context) {
  var params = {
    TableName: 'userInterests',
    Key: {
      "userId": event.userId
        // more attributes...
    },
    const interestsValue = event.interestsId,
    UpdateExpression: 'SET interests['+ interestsValue + '.isSelected] = :iSelect',
    ExpressionAttributeValues: {
        ':iSelect': event.isSelected
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
