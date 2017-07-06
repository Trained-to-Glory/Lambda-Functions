'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

//Create Functions
exports.handler.createPost = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'Posts',
    Item: { // a map of attribute name to AttributeValue
        "postId": event.postId,
        "userId": event.userId,
        "photo": event.photo,
        "created": event.created,
        "description": event.description || '',
        "isVisible": event.isVisible
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Read Functions

exports.handler.getListOfUserPosts = function(event, context) {
  var params = {
    TableName: 'Posts',
    KeyConditionExpression: 'postId = :pId AND userId = :uId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":pId": event.postId,
        ":uId": event.userId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getListPosts = function(event, context) {
  var params = {
    TableName: 'Posts',
    KeyConditionExpression: 'postId = :pId AND userId = :uId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":pId": event.postId,
        ":uId": event.userId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Update Functions

exports.handler.updatePostDescription = function(event, context) {
  var params = {
    TableName: 'Posts',
    Key: {
      "postId": event.postId,
      "userId": event.userId,
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

exports.handler.hidePosts = function(event, context) {
  var params = {
    TableName: 'Posts',
    Key: {
      "postId": event.postId,
      "userId": event.userId,
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
