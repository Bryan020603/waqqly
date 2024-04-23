import middy from '@middy/core';
import createError from 'http-errors';
import { dataSource } from '../config/db.js';
import { Pet } from '../models/pet.model.js';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = async (event) => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const queryParams = event.queryStringParameters || {};
    let query = {};

    if (queryParams.name) {
      query.name = { $regex: queryParams.name.toLowerCase(), $options: 'i' };
    }

    if (queryParams.color) {
      query.color = { $regex: queryParams.color.toLowerCase(), $options: 'i' };
    }
    if (queryParams.size) {
      query.size = queryParams.size;
    }
    if (queryParams.location) {
      query.petLocation = queryParams.location;
    }

    await dataSource.connect();
    const pets = await Pet.find(query).select('-__v');
    return {
      statusCode: 200,
      body: JSON.stringify(pets),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(
      error.message || 'Failed to fetch pets. Please try again!'
    );
  }
};

export const handleSearchPets = middy().handler(handler);
