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
    TableName: 'Message',
    Item: { // a map of attribute name to AttributeValue
        "messageId": event.messageId,
        "recepientId": event.recepientId,
        "sentUserId": event.sentUserId,
        "responded": event.responded,
        "title": event.title,
        "created": event.created,
        "isVisible": event.isVisible
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Get Functions

exports.handler.getListOfUserMessages = function(event, context) {
  var params = {
    TableName: 'Message',
    KeyConditionExpression: 'messageId = :mId AND recepientId = :rId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":rId": event.recepientId,
        ":mId": event.messageId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Remove Functions

exports.handler.removeFromGroup = function(event, context) {
  var params = {
    TableName: 'Message',
    Key: {
      "messageId": event.messageId,
      "recepientId": event.recepientId,
        // more attributes...
    },
    const removeId = event.recepientId,
    UpdateExpression: 'Remove recepientId['+ removeId + '] = :recepientId',
    ExpressionAttributeValues: {
        ':recepientId': event.recepientId
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Delete Functions

exports.handler.deleteMessage = function(event, context) {
  var params = {
    TableName: 'Message',
    Key: {
      "messageId": event.messageId,
      "recepientId": event.recepientId,
        // more attributes...
    },
    UpdateExpression: 'SET isVisible = :isVisible',
    ExpressionAttributeValues: {
        ':isVisible': event.isVisible
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
