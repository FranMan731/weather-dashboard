declare module '@env' {
    // AWS Cognito
    export const COGNITO_USER_POOL_ID: string;
    export const COGNITO_CLIENT_ID: string;
    export const AWS_REGION: string;
    
    // GraphQL
    export const GRAPHQL_ENDPOINT: string;
    
    // Weather API
    export const OPEN_WEATHER_API_KEY: string;
    export const WEATHER_BASE_URL: string;
    
    // Test User
    export const TEST_USER_EMAIL: string;
    export const TEST_USER_PASSWORD: string;
  }