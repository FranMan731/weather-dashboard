import { ApiError } from "./errors";

export type AuthUser = {
  username: string;
  attributes: {
    email: string;
    email_verified: boolean;
    sub: string;
  };
  signInUserSession: {
    idToken: {
      jwtToken: string;
      payload: {
        "cognito:username": string;
        email: string;
        exp: number;
        iat: number;
        sub: string;
      };
    };
    accessToken: {
      jwtToken: string;
      payload: {
        "cognito:groups"?: string[];
        client_id: string;
        exp: number;
        iat: number;
        sub: string;
        username: string;
      };
    };
    refreshToken: {
      token: string;
    };
  };
};

export type AuthContextType = {
  user: AuthUser | null;
  signIn: (username: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: ApiError | null;
};

export type UseAuthReturn = {
  user: AuthUser | null;
  authSignIn: (username: string, password: string) => Promise<AuthUser>;
  authSignOut: () => Promise<void>;
  getCurrentAuthenticatedUser: () => Promise<AuthUser | null>;
  isLoading: boolean;
  error: ApiError | null;
  clearError: () => void;
};

export interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  editable?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export interface AuthFormContainerProps {
  children: React.ReactNode;
  title: string;
}

export interface AuthPasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export interface AuthButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  text: string;
}

export interface AuthErrorBannerProps {
  error: ApiError | null;
  onDismiss: () => void;
}
