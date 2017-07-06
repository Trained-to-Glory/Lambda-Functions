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

//Create functions

exports.handler.createAccountDetails = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'AccountDetails',
    Item: { // a map of attribute name to AttributeValue
        "userId": event.userId,
        "email": event.email,
        "userBio": event.userBio
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Update Functions

exports.handler.updateBio = function(event, context) {
  var params = {
    TableName: 'AccountDetails',
    Key: {
        "userId": event.userId
        // more attributes...
    },
    UpdateExpression: 'SET userBio = :uBio',
    ExpressionAttributeValues: {
        ':uBio': event.userBio
    },
  };
  dynamodb.update(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
}

exports.handler.updateEmail = function(event, context) {
  var params = {
    TableName: 'AccountDetails',
    Key: {
        "userId": event.userId
        // more attributes...
    },
    UpdateExpression: 'SET email = :email',
    ExpressionAttributeValues: {
        ':email': event.email
    },
  };
  dynamodb.update(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
}

//Read Functions

exports.handler.getAccountDetails = function(event, context) {
  var params = {
    TableName: 'AccountDetails',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
          "userId": event.userId
        },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
