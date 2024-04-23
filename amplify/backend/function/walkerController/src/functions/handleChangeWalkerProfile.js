import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import createError from 'http-errors';
import mongoose from 'mongoose';
import { dataSource } from '../config/db.js';
import { WalkerProfile } from '../models/walker-profile.model.js';

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
    const _id = payload._id || new mongoose.Types.ObjectId();
    delete payload._id;
    const profile = await WalkerProfile.findOneAndUpdate(
      {
        _id,
      },
      {
        ...payload,
        userId,
      },
      {
        upsert: true,
        new: true,
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(profile),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(
      error.message || 'Failed to change profile!'
    );
  }
};

export const handleChangeWalkerProfile = middy()
  .use(jsonBodyParser())
  .handler(handler);
