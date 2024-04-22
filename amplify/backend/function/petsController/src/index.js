import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import httpRouterHandler from '@middy/http-router';
import cors from '@middy/http-cors';
import { handleCreatePet } from './functions/handleCreatePet.js';
import { handleGetUserPets } from './functions/handleGetUserPets.js';

const routes = [
  {
    method: 'POST',
    path: '/pets',
    handler: handleCreatePet,
  },
  {
    method: 'GET',
    path: '/pets',
    handler: handleGetUserPets,
  },
];

export const handler = middy()
  .use(cors())
  .use(httpSecurityHeaders())
  .use(httpErrorHandler())
  .handler(httpRouterHandler(routes));
