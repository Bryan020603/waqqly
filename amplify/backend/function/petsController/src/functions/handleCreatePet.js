import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
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
    const payload = event.body;
    await dataSource.connect();
    await Pet.create({
      ...payload,
      addedBy: userId,
    });
    return {
      statusCode: 200,
      body: JSON.stringify('Pet added successfully!'),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(
      error.message || 'Failed to create pet!'
    );
  }
};

export const handleCreatePet = middy().use(jsonBodyParser()).handler(handler);
