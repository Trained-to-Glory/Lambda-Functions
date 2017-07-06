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

//Create Functions

exports.handler.addFriend = function(event, context) {
  var params = {
    TableName: 'AccountAdded',
    Key: {
        "userId": event.userId
        // more attributes...
    },
    const addedPerson = event.addedId,
    ConditionExpression: 'attribute_not_exists(' + addedPerson + ')',
    UpdateExpression: 'ADD added = :added',
    ExpressionAttributeValues: {
        ':added': event.added
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Read Functions

exports.handler.getAdded = function(event, context) {
  var params = {
    TableName: 'AccountAdded',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
          "userId": event.userId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Remove Functions

exports.handler.removeFriend = function(event, context) {
  var params = {
    TableName: 'AccountAdded',
    Key: {
        "userId": event.userId
        // more attributes...
    },
    var addedPerson = event.addedId,
    ConditionExpression: 'attribute_exists(' + addedPerson + ')',
    UpdateExpression: 'SET added[' + addedPerson + '.isAdded] = :remove',
    ExpressionAttributeValues: {
        ':remove': event.added.addedId.isAdded
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
