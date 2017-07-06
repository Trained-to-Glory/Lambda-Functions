'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

//Create functions
exports.handler.createSystem = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'Systems',
    Item: { // a map of attribute name to AttributeValue
        "systemId": event.systemId,
        "userId": event.userId,
        "systemPhoto": event.systemPhoto,
        "title" : event.title
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Read Functions

exports.handler.getSystem = function(event, context) {
  var params = {
    TableName: 'Systems',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
        "systemId": event.systemId,
        "userId": event.userId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getListOfUserSystems = function(event, context) {
  var params = {
    TableName: 'Systems',
    KeyConditionExpression: 'systemId = :sId AND userId = :uId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":uId": event.userId,
        ":sId": event.systemId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getListOfSystems = function(event, context) {
  var params = {
    TableName: 'Systems'
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}


//Update Functions

exports.handler.updateSystemPhoto = function(event, context) {
  var params = {
    TableName: 'Systems',
    Key: {
      "systemId": event.systemId,
      "userId": event.userId,
        // more attributes...
    },
    UpdateExpression: 'SET systemPhoto = :systemPhoto',
    ExpressionAttributeValues: {
        ':systemPhoto': event.systemPhoto,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.updateSystemTitle = function(event, context) {
  var params = {
    TableName: 'Systems',
    Key: {
      "systemId": event.systemId,
      "userId": event.userId,
        // more attributes...
    },
    UpdateExpression: 'SET title = :title',
    ExpressionAttributeValues: {
        ':title': event.title,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
