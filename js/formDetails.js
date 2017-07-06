'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

exports.handler.createFormDetails = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'FormDetails',
    Item: { // a map of attribute name to AttributeValue
        "formId": event.formId,
        "created": event.created,
        "formRequests": event.formRequests
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Update Functions

exports.handler.updateRequests = function(event, context) {
  var params = {
    TableName: 'FormDetails',
    Key: {
      "formId": event.formId
        // more attributes...
    },
    UpdateExpression: 'SET formRequests = :formRequests',
    ExpressionAttributeValues: {
        ':formRequests': event.formRequests
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Get Functions
exports.handler.getFormDetails = function(event, context) {
  var params = {
    TableName: 'FormDetails',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
        "formId": event.formId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
