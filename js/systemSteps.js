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

exports.handler.createSteps = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'SystemSteps',
    Item: { // a map of attribute name to AttributeValue
        "systemId": event.systemId,
        "steps": event.steps
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};


exports.handler.toogleStep = function(event, context) {
  var params = {
    TableName: 'SystemSteps',
    Key: {
      "systemId": event.systemId
        // more attributes...
    },
    const currentStepId = event.steps.stepId
    UpdateExpression: 'SET steps[' + currentStepId + '.isComplete] = :steps',
    ExpressionAttributeValues: {
        ':steps': currentStepId.isComplete
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.changeStepInfo = function(event, context) {
  var params = {
    TableName: 'SystemSteps',
    Key: {
      "systemId": event.systemId,
        // more attributes...
    },
    const currentStepId = event.steps.stepId
    UpdateExpression: 'SET steps[' + currentStepId '.text] = :steps',
    ExpressionAttributeValues: {
        ':steps': currentStepId.text
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.changeStepPosition = function(event, context) {
  var params = {
    TableName: 'SystemSteps',
    Key: {
      "systemId": event.systemId,
        // more attributes...
    },
    const currentStepId = event.steps.stepId
    UpdateExpression: 'SET steps[' + currentStepId + '.position] = :steps',
    ExpressionAttributeValues: {
        ':steps': currentStepId.position
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.removeStep = function(event, context) {
  var params = {
    TableName: 'SystemSteps',
    Key: {
      "systemId": event.systemId,
        // more attributes...
    },
    const currentStepId = event.steps.stepId
    UpdateExpression: 'SET steps[' + currentStepId + '.isVisible] = :isVisible',
    ExpressionAttributeValues: {
        ':isVisible': currentStepId.isVisible
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}


exports.handler.addStepToList = function(event, context) {
  var params = {
    TableName: 'SystemSteps',
    Key: {
      "systemId": event.systemId,
        // more attributes...
    },
    UpdateExpression: 'ADD steps = :steps',
    ExpressionAttributeValues: {
        ':steps': event.steps
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getSystemSteps = function(event, context) {
  var params = {
    TableName: 'SystemSteps',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
        "systemId": event.systemId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
