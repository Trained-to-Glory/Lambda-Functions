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

exports.handler.addSystemDetails = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'SystemsDetails',
    Item: { // a map of attribute name to AttributeValue
        "systemId": event.systemId,
        "description" : event.description || '',
        "created" : event.created,
        "isVisible" : event.isVisible,
        "isPurchased" : event.isPurchased,
        "added": event.added
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

exports.handler.updateSystemStatus = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: {
      "systemId": event.systemId
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

exports.handler.updateSystemFinished = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: {
      "systemId": event.systemId
        // more attributes...
    },
    UpdateExpression: 'SET isFinished = :isFinished',
    ExpressionAttributeValues: {
        ':isFinished': event.isFinished,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.updateSystemPurchase = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: {
      "systemId": event.systemId
        // more attributes...
    },
    UpdateExpression: 'SET isPurchased = :isPurchased',
    ExpressionAttributeValues: {
        ':isPurchased': event.isPurchased,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.addFriends = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: {
      "systemId": event.systemId
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

exports.handler.updateSystemDescription = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: {
      "systemId": event.systemId
        // more attributes...
    },
    UpdateExpression: 'SET description = :description',
    ExpressionAttributeValues: {
        ':description': event.description,
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}


//Delete Functions

exports.handler.removeFriend = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: {
      "systemId": event.systemId
        // more attributes...
    },

    const friendAdded = event.addedId
    UpdateExpression: 'SET added[' + friendAdded + '.isAdded] = :isAdded',
    ExpressionAttributeValues: {
        ':isAdded': event.isAdded
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getSystemDetails = function(event, context) {
  var params = {
    TableName: 'SystemsDetails',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
        "systemId": event.systemId
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
