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

//Create functions

exports.handler.addUser = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'Account',
    Item: { // a map of attribute name to AttributeValue
        "userId": event.userId,
        "userName": event.userName,
        "fullName": event.fullName,
        "isLeader": event.isLeader

    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Update Functions

exports.handler.updateLeaderStatus = function(event, context) {
  var params = {
    TableName: 'Account',
    Key: {
        "userId": event.userId,
        "userName": event.userName,
        // more attributes...
    },
    UpdateExpression: 'SET isLeader = :isLeader',
    ExpressionAttributeValues: {
        ':isLeader': event.isLeader
    },
  };
  dynamodb.update(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
}

exports.handler.updateProfilePic = function(event, context) {
  var params = {
    TableName: 'Account',
    Key: {
        "userId": event.userId,
        "userName": event.userName
        // more attributes...
    },
    UpdateExpression: 'SET userPhoto = :uPhoto',
    ExpressionAttributeValues: {
        ':uPhoto': event.userPhoto
      },
  };
  dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

  exports.handler.updateUserName = function(event, context) {
    var params = {
      TableName: 'Account',
      Key: {
          "userId": event.userId,
          "userName": event.userName
          // more attributes...
      },
      UpdateExpression: 'SET userName = :uName',
      ExpressionAttributeValues: {
          ':uName': event.userName
      },
    };
    dynamodb.update(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
    });
  }

//Read functions

exports.handler.getAccount = function(event, context) {
  var params = {
    TableName: 'Account',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
          "userId": event.userId,
          "userName": event.userName
      },
  };
  dynamodb.get(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
