import middy from '@middy/core';
import createError from 'http-errors';
import { dataSource } from '../config/db.js';
import { WalkerProfile } from '../models/walker-profile.model.js';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = async (event) => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const queryParams = event.queryStringParameters || {};
    let query = {};

    if (queryParams.experience) {
      query.numOfExperience = queryParams.numOfExperience;
    }
    if (queryParams.age) {
      query.age = queryParams.age;
    }
    if (queryParams.location) {
      query.location = queryParams.location;
    }
    await dataSource.connect();
    const walkers = await WalkerProfile.find(query).select('-__v');
    return {
      statusCode: 200,
      body: JSON.stringify(walkers),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(
      error.message || 'Failed to fetch walkers. Please try again!'
    );
  }
};

export const handleSearchWalkers = middy().handler(handler);
