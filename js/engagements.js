'use strict';

const AWS = require('aws-sdk');
var config = {
  "region":"localhost",
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

//Create Functions

exports.handler.createEngagements = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'PostEngagements',
    Item: { // a map of attribute name to AttributeValue
        "postId": event.postId,
        "totalComments": event.totalComments,
        "totalLikes": event.totalLikes
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

exports.handler.createComment = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'PostComments',
    Item: { // a map of attribute name to AttributeValue
        "postId": event.postId,
        "commentId": event.commentId,
        "comment": event.comment,
        "totalComments": event.totalComments
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

exports.handler.createLikes = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'PostLikes',
    Item: { // a map of attribute name to AttributeValue
        "postId": event.postId,
        "likeInfo": event.likeInfo,
        "totalLikes": event.totalLikes
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

exports.handler.savePost = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'SavedPost',
    Item: { // a map of attribute name to AttributeValue
        "postId": event.postId,
        "systemId": event.systemId,
        "photo": event.photo,
        "created": event.created,
        "isSaved": event.isSaved
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Get Functions

exports.handler.getListPostComments = function(event, context) {
  var params = {
    TableName: 'PostComments',
    KeyConditionExpression: 'postId = :pId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":pId": event.postId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

exports.handler.getUserSavedPosts = function(event, context) {
  var params = {
    TableName: 'SavedPost',
    KeyConditionExpression: 'postId = :pId AND systemId = :sId',
    ExpressionAttributeValues: { // a map of attribute name to AttributeValue for all primary key attributes
        ":pId": event.postId,
        ":sId": event.systemId
      },
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}

//Delete Functions

exports.handler.removeComment = function(event, context) {
  var params = {
    TableName: 'PostComments',
    Key: {
      "postId": event.postId,
      "commentId": event.commentId
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
