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
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
    const authProvider =
      event.requestContext.identity.cognitoAuthenticationProvider;
    const [, , , userId] = authProvider.match(IDP_REGEX);
    await dataSource.connect();
    const pets = await Pet.find({
      addedBy: userId,
    }).select('-__v');
    return {
      statusCode: 200,
      body: JSON.stringify(pets),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(
      error.message || 'Failed to fetch your pets. Please try again!'
    );
  }
};

export const handleGetUserPets = middy().handler(handler);
