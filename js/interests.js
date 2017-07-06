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
const uuid = require('uuid');

//Create functions
exports.handler.createInterestsList = function(event, context) {
  // console.log('Received event:', JSON.stringify(event));
  var params = {
    TableName: 'Interests',
    Item: { // a map of attribute name to AttributeValue
        "interestsId": event.interestsId,
        "interestsName": event.interestsName
    },
  };
  dynamodb.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
  });
};

//Read Functions
exports.handler.viewInterestList = function(event, context) {
  var params = {
    TableName: 'Interests'
  };
  dynamodb.query(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
  });
}
