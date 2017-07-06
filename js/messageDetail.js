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

exports.handler.createMessage = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'MessageDetails',
    Item: { // a map of attribute name to AttributeValue
        "messageId": event.messageId,
        "text": event.text,
        "created": event.created
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

exports.handler.updateMessage = function(event, context) {
  var params = {
    TableName: 'MessageDetails',
    Key: {
      "messageId": event.messageId
        // more attributes...
    },
    UpdateExpression: 'SET text = :text',
    ExpressionAttributeValues: {
        ':text': event.text
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Get Functions
exports.handler.getMessageDetails = function(event, context) {
  var params = {
    TableName: 'MessageDetails',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
        "messageId": event.messageId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
