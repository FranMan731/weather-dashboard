import { config } from './config';

const awsExports = {
  Auth: {
    region: config.cognito.region,
    userPoolId: config.cognito.userPoolId,
    userPoolWebClientId: config.cognito.userPoolClientId,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  API: {
    GraphQL: {
      endpoint: config.graphql.endpoint,
      region: config.cognito.region,
      defaultAuthMode: 'userPool',
    }
  },
  aws_project_region: config.cognito.region,
  aws_cognito_region: config.cognito.region,
  aws_user_pools_id: config.cognito.userPoolId,
  aws_user_pools_web_client_id: config.cognito.userPoolClientId,
  aws_appsync_graphqlEndpoint: config.graphql.endpoint,
  aws_appsync_region: config.cognito.region,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};

export default awsExports;