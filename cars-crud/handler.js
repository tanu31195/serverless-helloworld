'use strict';
const AWS = require('aws-sdk');
module.exports = {
  create: async (event, context) => {
    //event can be from API gateway/SNS/SQS
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(event.body);
    } catch (error) {
      console.log('There was an error parsing the body', error); //can be viewed from cloud watch logs and accessed later
      return {
        statusCode: 400
      }
    }

    if (typeof bodyObj.name === 'undefined' || typeof bodyObj.price === 'undefined') {
      console.log('Missing parameters');
      return {
        statusCode: 400
      }
    }

    let putParams = {
      TableName: process.env.DYNAMODB_CAR_TABLE,
      Item: {
        name: bodyObj.name,
        price: bodyObj.price
      }
    }

    let putResult = {};

    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      putResult = await dynamodb.put(putParams).promise();
    } catch (putError) {
      console.log('There was a error putting the car');
      console.log('putError', putError);
      return {
        statusCode: 500
      }
    }
    return {
      statusCode: 201
    }

  },
  list: async (event, context) => {
    let scanParams = {
      TableName: process.env.DYNAMODB_CAR_TABLE
    }

    let scanResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      scanResult = await dynamodb.scan(scanParams).promise()
    } catch (scanError) {
      console.log('There was a error scanning the cars');
      console.log('scanError', scanError);
      return {
        statusCode: 500
      }
    }

    if (scanResult.Items === null || !Array.isArray(scanResult.Items) || scanResult.Items.length === 0) {
      return {
        statusCode: 404
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(scanResult.Items.Items.map(car => {
        return {
          name: car.name,
          price: car.price
        }
      }))
    }

  },
  get: async (event, context) => {
    let getParams = {
      TableName: process.env.DYNAMODB_CAR_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }

    let getResult = {}

    try {
      let dynamodb = AWS.DynamoDB.DocumentClient();
      getResult = dynamodb.get(getParams).promise();
    } catch (getError) {
      console.log('There was a error getting the car');
      console.log('getError', getError);
      return {
        statusCode: 500
      }
    }

    if (getResult.Item === null) {
      return {
        statusCode: 404
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: getResult.name,
        price: getResult.price
      })
    }

  },
  update: async (event, context) => {
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(event.body);
    } catch (error) {
      console.log('There was an error parsing the body', error); //can be viewed from cloud watch logs and accessed later
      return {
        statusCode: 400
      }
    }

    if (typeof bodyObj.price === 'undefined') {
      console.log('Missing parameters');
      return {
        statusCode: 400
      }
    }

    let updateParams = {
      TableName: process.env.DYNAMODB_CAR_TABLE,
      Key: {
        name: event.pathParameters.name
      },
      UpdateExpression: 'set #price = :price',
      ExpressionAttributeValues: {
        '#price' : 'price'
      },
      ExpressionAttributeValues: {
        '#price' : bodyObj.price
      }
    }

    try {
      let dynamodb = AWS.DynamoDB.DocumentClient();
      dynamodb.get(updateParams).promise();
    } catch (updateError) {
      console.log('There was a error updating the car');
      console.log('updateError', updateError);
      return {
        statusCode: 500
      }
    }

    if (updateResult.Item === null) {
      return {
        statusCode: 404
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: updateResult.name,
        price: updateResult.price
      })
    }

  },
  delete: async (event, context) => {
    let deleteParams = {
      TableName: process.env.DYNAMODB_CAR_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }

    let deleteResult = {}

    try {
      let dynamodb = AWS.DynamoDB.DocumentClient();
      deleteResult = dynamodb.delete(deleteParams).promise();
    } catch (deleteError) {
      console.log('There was a error deleting the car');
      console.log('deleteError', deleteError);
      return {
        statusCode: 500
      }
    }

    return {
      statusCode: 200  
    }
  },

};
