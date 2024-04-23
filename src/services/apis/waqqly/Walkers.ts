/* eslint-disable @typescript-eslint/no-explicit-any */

import { get, post } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';

const RestConfig = Amplify.getConfig().API!.REST!;
const ApiName = Object.keys(RestConfig)[0];

export const handleChangeWalkerProfile = async (
  payload: Record<string, any>
) => {
  const postOperation = post({
    apiName: ApiName,
    path: '/walker/profile',
    options: {
      body: payload,
    },
  });
  const { body } = await postOperation.response;
  const response = await body.json();
  return response;
};

export const getWalkerProfile = async () => {
  const getOperation = get({
    apiName: ApiName,
    path: '/walker/profile',
  });
  const { body } = await getOperation.response;
  const response = await body.json();
  return response;
};
export const getWalkers = async (params: Record<string, string>) => {
  const getOperation = get({
    apiName: ApiName,
    path: '/walker/search',
    options: {
      queryParams: params,
    },
  });
  const { body } = await getOperation.response;
  const response = await body.json();
  return response;
};
