'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

//Create Functions
exports.handler.addEvent = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'Calendar',
    Item: { // a map of attribute name to AttributeValue
        "eventId": event.eventId,
        "userId": event.userId,
        "title": event.title,
        "date": event.date,
        "added": event.added
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Update Functions

exports.handler.updateEventAdded = function(event, context) {
  var params = {
    TableName: 'Calendar',
    Key: {
      "eventId": event.eventId,
      "userId": event.userId,
        // more attributes...
    },
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

exports.handler.updateEventTitle = function(event, context) {
  var params = {
    TableName: 'Calendar',
    Key: {
      "eventId": event.eventId,
      "userId": event.userId
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

exports.handler.updateEventDate = function(event, context) {
  var params = {
    TableName: 'Calendar',
    Key: {
      "eventId": event.eventId,
      "userId": event.userId
        // more attributes...
    },
    UpdateExpression: 'SET date = :date',
    ExpressionAttributeValues: {
        ':date': event.date,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Remove Added

exports.handler.removeAdded = function(event, context) {
  var params = {
    TableName: 'Calendar',
    Key: {
      "eventId": event.eventId,
      "userId": event.userId,
        // more attributes...
    },
    const addedPerson = event.added.addedId
    ConditionExpression: 'attribute_exists(' + addedPerson + ')',
    UpdateExpression: 'REMOVE added.addedId = :added',
    ExpressionAttributeValues: {
        ':added': event.added
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Get Methods

exports.handler.getEvent = function(event, context) {
  var params = {
    TableName: 'Calendar',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
      "eventId": event.eventId,
      "userId": event.userId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getListOfUserEvents = function(event, context) {
  var params = {
    TableName: 'Calendar',
    KeyConditionExpression: 'eventId = :eId AND userId = :uId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":uId": event.userId,
        ":eId": event.eventId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
