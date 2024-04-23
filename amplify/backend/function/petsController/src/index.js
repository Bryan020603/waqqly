import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import httpRouterHandler from '@middy/http-router';
import cors from '@middy/http-cors';
import { handleCreatePet } from './functions/handleCreatePet.js';
import { handleGetUserPets } from './functions/handleGetUserPets.js';
import { handleSearchPets } from './functions/handleSearchPets.js';
import { handleDeletePet } from './functions/handleDeletePet.js';

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
  {
    method: 'GET',
    path: '/pets/{id}',
    handler: handleDeletePet,
  },
  {
    method: 'GET',
    path: '/pets/search',
    handler: handleSearchPets,
  },
];

export const handler = middy()
  .use(cors())
  .use(httpSecurityHeaders())
  .use(httpErrorHandler())
  .handler(httpRouterHandler(routes));
