import {
  COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID,
  AWS_REGION,
  GRAPHQL_ENDPOINT,
  OPEN_WEATHER_API_KEY,
  WEATHER_BASE_URL,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD
} from '@env';

export const config = {
  cognito: {
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolClientId: COGNITO_CLIENT_ID,
    region: AWS_REGION,
  },
  graphql: {
    endpoint: GRAPHQL_ENDPOINT,
  },
  weather: {
    apiKey: OPEN_WEATHER_API_KEY,
    baseUrl: WEATHER_BASE_URL,
  },
  testUser: {
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  },
};