'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

//Create functions
exports.handler.createForms = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'Forms',
    Item: { // a map of attribute name to AttributeValue
        "formId": event.formId,
        "recepientId": event.recepientId,
        "sentUserId": event.sentUserId,
        "title" : event.title,
        "created": event.created,
        "isVisible": event.isVisible,
        "responded": event.responded
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Accept/Decline

exports.handler.formStatus = function(event, context) {
  var params = {
    TableName: 'Forms',
    Key: {
      "formId": event.formId,
      "recepientId": event.recepientId
        // more attributes...
    },
    UpdateExpression: 'SET isAccepted = :isAccepted',
    ExpressionAttributeValues: {
        ':isAccepted': event.isAccepted
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Remove Functions

exports.handler.removeForm = function(event, context) {
  var params = {
    TableName: 'Forms',
    Key: {
      "formId": event.formId,
      "recepientId": event.recepientId
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


//Get Functions

exports.handler.getUserForm = function(event, context) {
  var params = {
    TableName: 'Forms',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
        "formId": event.formId,
        "recepientId": event.recepientId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}


exports.handler.getListOfUserForms = function(event, context) {
  var params = {
    TableName: 'Forms',
    KeyConditionExpression: 'formId = :fId AND recepientId = :rId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":rId": event.recepientId,
        ":fId": event.formId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
