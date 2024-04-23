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

    const id = event.pathParameters.id;
    await dataSource.connect();
    await Pet.findOneAndDelete({
      _id: id,
    });
    return {
      statusCode: 200,
      body: JSON.stringify('Pet deleted successfully!'),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(
      error.message || 'Failed to delete pet!'
    );
  }
};

export const handleDeletePet = middy().handler(handler);
