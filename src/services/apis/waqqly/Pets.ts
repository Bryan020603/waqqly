/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post, del } from 'aws-amplify/api';
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
  const getOperation = get({
    apiName: ApiName,
    path: '/pets',
  });
  const { body } = await getOperation.response;
  const response = await body.json();
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPets = async (params: Record<string, any>) => {
  const getOperation = get({
    apiName: ApiName,
    path: '/pets/search',
    options: {
      queryParams: params,
    },
  });
  const { body } = await getOperation.response;
  const response = await body.json();
  return response;
};

export const deletePet = async (id: string) => {
  const deleteOperation = del({
    apiName: ApiName,
    path: `/pets/${id}`,
  });
  const response = await deleteOperation.response;
  return response;
};
