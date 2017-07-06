'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

exports.handler.addEvent = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'CalendarDetails',
    Item: { // a map of attribute name to AttributeValue
        "eventId": event.eventId,
        "reminder": event.reminder,
        "startTime": event.startTime || '',
        "endTime": event.endTime || '',
        "allDay": event.allDay || '',
        "isVisible": event.isVisible
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

exports.handler.updateEventReminder = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: {
      "eventId": event.eventId
        // more attributes...
    },
    UpdateExpression: 'SET reminder = :reminder',
    ExpressionAttributeValues: {
        ':reminder': event.reminder
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.updateEventTimes = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: {
      "eventId": event.eventId
        // more attributes...
    },
    UpdateExpression: 'SET startTime = :startTime AND endTime = :endTime',
    ExpressionAttributeValues: {
        ':startTime': event.startTime,
        ':endTime': event.endTime
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.updateEventStartTime = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: {
      "eventId": event.eventId
        // more attributes...
    },
    UpdateExpression: 'SET startTime = :startTime',
    ExpressionAttributeValues: {
        ':startTime': event.startTime,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.updateEventEndTime = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: {
      "eventId": event.eventId
        // more attributes...
    },
    UpdateExpression: 'SET endTime = :endTime',
    ExpressionAttributeValues: {
        ':endTime': event.endTime,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.updateAllDay = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: {
      "eventId": event.eventId
        // more attributes...
    },
    UpdateExpression: 'SET allDay = :allDay',
    ExpressionAttributeValues: {
        ':allDay': event.allDay,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.hideEvent = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: {
      "eventId": event.eventId
        // more attributes...
    },
    UpdateExpression: 'SET isVisible = :isVisible',
    ExpressionAttributeValues: {
        ':isVisible': event.isVisible,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Get Methods

exports.handler.getEventDetails = function(event, context) {
  var params = {
    TableName: 'CalendarDetails',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
      "eventId": event.eventId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
