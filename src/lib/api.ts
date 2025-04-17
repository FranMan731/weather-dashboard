import { Amplify } from 'aws-amplify';
import awsconfig from '../constants/aws-exports';

Amplify.configure(awsconfig);

export const signIn = async (credentials: { username: string; password: string }) => {
  return await Amplify.Auth.signIn(credentials.username, credentials.password);
};

export const signOut = async () => {
  return await Amplify.Auth.signOut();
};

export const getCurrentUser = async () => {
  try {
    return await Amplify.Auth.currentAuthenticatedUser();
  } catch {
    return null;
  }
};

export const fetchAuthSession = async () => {
  return await Amplify.Auth.currentSession();
};