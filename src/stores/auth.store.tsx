import { makeAutoObservable, runInAction } from 'mobx';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { config } from '@/constants/config';
import { Auth } from 'aws-amplify';
import { ApiError, toApiError } from '@/types/errors';

class AuthStore {
  user: CognitoUser | null = null;
  isLoading = false;
  error: ApiError | null = null;
  username = config.testUser.email;
  password = config.testUser.password;

  constructor() {
    makeAutoObservable(this);
  }

  setUsername = (username: string) => {
    this.username = username;
  };

  setPassword = (password: string) => {
    this.password = password;
  };

  signIn = async () => {
    this.isLoading = true;
    this.error = null;

    try {
      const user = await Auth.signIn(this.username, this.password);
      runInAction(() => {
        this.user = user;
      });
      return user;
    } catch (error) {
      runInAction(() => {
        this.error = toApiError(error);
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  signOut = async () => {
    try {
      await Auth.signOut();
      runInAction(() => {
        this.user = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toApiError(error);
      });
    }
  };

  clearError = () => {
    this.error = null;
  };
}

export const authStore = new AuthStore();
export type AuthStoreType = AuthStore;