import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import * as storageService from './storageService';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const VERIFY_TOKEN_QUERY = gql`
  query ValidateToken($token: String!) {
    validateToken(token: $token)
  }
`;

const TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';

export const setAuthCredentials = async (token: string, userId: string) => {
  await storageService.setItem(TOKEN_KEY, token);
  await storageService.setItem(USER_ID_KEY, userId);
};

export const getAuthToken = () => {
  return storageService.getItem(TOKEN_KEY);
};

export const getUserId = () => {
  return storageService.getItem(USER_ID_KEY);
};

export const removeAuthCredentials = async () => {
  await storageService.removeItem(TOKEN_KEY);
  await storageService.removeItem(USER_ID_KEY);
};

export const verifyAuth = async () => {
  const token = await getAuthToken();
  const uuid = await getUserId();

  if (!token || !uuid) {
    return false;
  }

  try {
    const { data } = await client.query({
      query: VERIFY_TOKEN_QUERY,
      variables: { token },
      fetchPolicy: 'network-only',
    });
    return data.validateToken;
  } catch (error) {
    console.error(error);
    await removeAuthCredentials();
    return false;
  }
};
