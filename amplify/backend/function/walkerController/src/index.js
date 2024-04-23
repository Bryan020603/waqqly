/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	MONGODB_URI
Amplify Params - DO NOT EDIT */
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import httpRouterHandler from '@middy/http-router';
import cors from '@middy/http-cors';
import { handleChangeWalkerProfile } from './functions/handleChangeWalkerProfile.js';
import { handleGetProfile } from './functions/handleGetProfile.js';
import { handleSearchWalkers } from './functions/handleSearchWalkers.js';

const routes = [
  {
    method: 'POST',
    path: '/walker/profile',
    handler: handleChangeWalkerProfile,
  },
  {
    method: 'GET',
    path: '/walker/profile',
    handler: handleGetProfile,
  },
  {
    method: 'GET',
    path: '/walker/search',
    handler: handleSearchWalkers,
  },
];

export const handler = middy()
  .use(cors())
  .use(httpSecurityHeaders())
  .use(httpErrorHandler())
  .handler(httpRouterHandler(routes));
