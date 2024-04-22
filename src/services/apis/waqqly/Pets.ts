/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';

const RestConfig = Amplify.getConfig().API!.REST!;
const ApiName = Object.keys(RestConfig)[0];

export const createPet = async (payload: Record<string, any>) => {
  const postOperation = post({
    apiName: ApiName,
    path: '/pets',
    options: {
      body: payload,
    },
  });
  const { body } = await postOperation.response;
  const response = await body.json();
  return response;
};

export const getUserPets = async () => {
  const postOperation = get({
    apiName: ApiName,
    path: '/pets',
  });
  const { body } = await postOperation.response;
  const response = await body.json();
  return response;
};
